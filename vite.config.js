import http from 'node:http'
import https from 'node:https'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function sanitizeFileName(name = 'apod-media') {
  return name
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 140) || 'apod-media';
}

function getFileNameFromUrl(urlString) {
  try {
    const parsed = new URL(urlString);
    const pathPart = decodeURIComponent(parsed.pathname.split('/').pop() || 'apod-media');
    return sanitizeFileName(pathPart);
  } catch {
    return 'apod-media';
  }
}

function requestUpstream(urlString, redirectCount = 0) {
  const MAX_REDIRECTS = 5;

  return new Promise((resolve, reject) => {
    let target;

    try {
      target = new URL(urlString);
    } catch {
      reject(new Error('Invalid URL'));
      return;
    }

    const client = target.protocol === 'https:' ? https : http;

    const req = client.request(
      target,
      {
        method: 'GET',
        timeout: 15000,
        family: 4,
        headers: {
          'User-Agent': 'AstroViews-Download-Proxy/1.0',
          Accept: '*/*',
          Connection: 'close',
        },
      },
      (upstream) => {
        const statusCode = upstream.statusCode || 500;
        const location = upstream.headers.location;

        if (statusCode >= 300 && statusCode < 400 && location && redirectCount < MAX_REDIRECTS) {
          upstream.resume();
          const nextUrl = new URL(location, target).toString();
          requestUpstream(nextUrl, redirectCount + 1).then(resolve).catch(reject);
          return;
        }

        resolve({ upstream, statusCode, targetUrl: target.toString() });
      }
    );

    req.on('timeout', () => {
      req.destroy(new Error('Upstream timeout'));
    });

    req.on('error', reject);
    req.end();
  });
}

function downloadProxyPlugin() {
  return {
    name: 'download-proxy',
    configureServer(server) {
      server.middlewares.use('/download-proxy', async (req, res) => {
        try {
          const host = req.headers.host || 'localhost';
          const parsed = new URL(req.url || '', `http://${host}`);
          const target = parsed.searchParams.get('url');

          if (!target) {
            res.statusCode = 400;
            res.end('Missing "url" query parameter');
            return;
          }

          let targetUrl;
          try {
            targetUrl = new URL(target);
          } catch {
            res.statusCode = 400;
            res.end('Invalid target URL');
            return;
          }

          if (!['http:', 'https:'].includes(targetUrl.protocol)) {
            res.statusCode = 400;
            res.end('Only http/https URLs are allowed');
            return;
          }

          const { upstream, statusCode, targetUrl: finalUrl } = await requestUpstream(targetUrl.toString());

          if (statusCode >= 400) {
            res.statusCode = statusCode;
            res.end(`Upstream error: ${statusCode}`);
            upstream.resume();
            return;
          }

          const contentType = upstream.headers['content-type'] || 'application/octet-stream';
          const contentLength = upstream.headers['content-length'];
          const upstreamDisposition = upstream.headers['content-disposition'];
          const fallbackName = getFileNameFromUrl(finalUrl);

          res.statusCode = 200;
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Cache-Control', 'no-store');
          res.setHeader('Content-Type', contentType);
          if (contentLength) res.setHeader('Content-Length', contentLength);

          if (upstreamDisposition) {
            res.setHeader('Content-Disposition', upstreamDisposition);
          } else {
            res.setHeader('Content-Disposition', `attachment; filename="${fallbackName}"`);
          }

          upstream.pipe(res);
        } catch {
          res.statusCode = 500;
          res.end('Proxy download failed');
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), downloadProxyPlugin()],
})
