const MIME_EXTENSION_MAP = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'video/mp4': 'mp4',
  'video/webm': 'webm',
  'video/ogg': 'ogg',
};

function sanitizeFileName(name = 'apod-media') {
  return name
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 140) || 'apod-media';
}

function getExtensionFromUrl(url = '', fallback = 'bin') {
  try {
    const parsed = new URL(url);
    const pathname = parsed.pathname;
    const ext = pathname.split('.').pop();

    if (ext && ext.length <= 8 && /^[a-zA-Z0-9]+$/.test(ext)) {
      return ext.toLowerCase();
    }

    return fallback;
  } catch {
    return fallback;
  }
}

function getExtensionFromMime(mimeType = '') {
  if (!mimeType) return '';
  const normalized = mimeType.toLowerCase().split(';')[0].trim();
  return MIME_EXTENSION_MAP[normalized] || normalized.split('/')[1] || '';
}

function triggerDownload(href, filename) {
  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.download = filename;
  anchor.rel = 'noopener noreferrer';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

function buildDownloadCandidates(url) {
  const encoded = encodeURIComponent(url);

  return [
    `/download-proxy?url=${encoded}`,
    url,
    `https://corsproxy.io/?${encoded}`,
    `https://api.allorigins.win/raw?url=${encoded}`,
    `https://cors.isomorphic-git.org/${url}`,
  ];
}

async function fetchBlobWithFallbacks(url) {
  const candidates = buildDownloadCandidates(url);

  for (const candidate of candidates) {
    try {
      const response = await fetch(candidate, {
        mode: 'cors',
        cache: 'no-store',
        redirect: 'follow',
      });

      if (!response.ok) continue;

      const blob = await response.blob();
      if (!blob || blob.size === 0) continue;

      const blobType = (blob.type || '').toLowerCase();
      if (blobType.includes('text/html')) continue;

      return blob;
    } catch {
      // Try next candidate.
    }
  }

  return null;
}

export async function downloadFromUrl(url, baseName = 'apod-media') {
  if (!url) return false;

  const safeBaseName = sanitizeFileName(baseName);
  const blob = await fetchBlobWithFallbacks(url);
  if (!blob) return false;

  try {
    const blobUrl = URL.createObjectURL(blob);
    const mimeExt = getExtensionFromMime(blob.type);
    const urlExt = getExtensionFromUrl(url, 'bin');
    const extension = mimeExt || urlExt || 'bin';

    triggerDownload(blobUrl, `${safeBaseName}.${extension}`);
    window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1200);
    return true;
  } catch {
    return false;
  }
}
