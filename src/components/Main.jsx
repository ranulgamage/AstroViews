import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'

const DIRECT_VIDEO_PATTERN = /\.(mp4|webm|ogg)(\?.*)?$/i;

function getEmbedVideoUrl(url = '') {
  if (!url) return '';

  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.toLowerCase();

    if (host.includes('youtube.com')) {
      if (parsedUrl.pathname.startsWith('/embed/')) {
        parsedUrl.searchParams.set('autoplay', '1');
        parsedUrl.searchParams.set('mute', '0');
        parsedUrl.searchParams.set('volume', '100');
        parsedUrl.searchParams.set('playsinline', '1');
        parsedUrl.searchParams.set('rel', '0');
        return parsedUrl.toString();
      }
      const videoId = parsedUrl.searchParams.get('v');
      if (videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&volume=100&playsinline=1&rel=0`;
    }

    if (host === 'youtu.be') {
      const videoId = parsedUrl.pathname.replace('/', '').trim();
      if (videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&volume=100&playsinline=1&rel=0`;
    }

    if (host.includes('vimeo.com') && !host.includes('player.vimeo.com')) {
      const videoId = parsedUrl.pathname.split('/').filter(Boolean).pop();
      if (videoId) return `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=0`;
    }

    if (host.includes('player.vimeo.com')) {
      parsedUrl.searchParams.set('autoplay', '1');
      parsedUrl.searchParams.set('muted', '0');
      return parsedUrl.toString();
    }

    parsedUrl.searchParams.set('autoplay', '1');
    parsedUrl.searchParams.set('mute', '0');
    parsedUrl.searchParams.set('muted', '0');
    return parsedUrl.toString();
  } catch {
    return url;
  }
}

export default function Main(props) {
  const { data } = props;
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const isImage = data?.media_type === 'image';
  const isVideo = data?.media_type === 'video';

  const displayImageUrl = data?.hdurl || data?.url || 'galaxy-image.png';

  const displayVideoUrl = useMemo(() => {
    if (!isVideo) return '';
    return getEmbedVideoUrl(data?.url || '');
  }, [data?.url, isVideo]);

  const isDirectVideo = DIRECT_VIDEO_PATTERN.test(data?.url || '');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    setMediaLoaded(false);

    if (!isImage && !isVideo) {
      setMediaLoaded(true);
      return;
    }

    if (isVideo) {
      const fallbackTimeout = window.setTimeout(() => {
        setMediaLoaded(true);
      }, 1400);

      return () => window.clearTimeout(fallbackTimeout);
    }

    return undefined;
  }, [data?.media_type, data?.url, data?.hdurl, isImage, isVideo]);

  useEffect(() => {
    if (isVideo) {
      document.body.classList.add('video-apod-active');
    } else {
      document.body.classList.remove('video-apod-active');
    }

    return () => {
      document.body.classList.remove('video-apod-active');
    };
  }, [isVideo]);

  return (
    <div className={`imgContainer ${isVideo ? 'video-mode' : ''}`}>
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{
          opacity: mediaLoaded ? 1 : 0,
          scale: mediaLoaded ? 1 : 1.1,
          x: isImage ? mousePosition.x : 0,
          y: isImage ? mousePosition.y : 0,
        }}
        transition={{
          opacity: { duration: 0.8 },
          scale: { duration: 0.8 },
          x: { duration: 0.5, ease: 'easeOut' },
          y: { duration: 0.5, ease: 'easeOut' },
        }}
        style={{ height: '100%', width: '100%' }}
      >
        {isImage && (
          <img
            src={displayImageUrl}
            alt={data?.title || 'Astronomy Picture of the Day'}
            className='bgImage'
            onLoad={() => setMediaLoaded(true)}
            onError={() => setMediaLoaded(true)}
          />
        )}

        {isVideo && (
          <div className='videoMediaShell'>
            {isDirectVideo ? (
              <video
                className='bgVideo'
                autoPlay
                controls
                playsInline
                preload='metadata'
                onLoadedData={(event) => {
                  event.currentTarget.volume = 1;
                  event.currentTarget.muted = false;
                  setMediaLoaded(true);
                }}
              >
                <source src={data?.url} />
                Your browser does not support video playback.
              </video>
            ) : (
              <iframe
                className='bgVideoFrame'
                src={displayVideoUrl}
                title={data?.title || 'APOD video'}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                referrerPolicy='strict-origin-when-cross-origin'
                allowFullScreen
                onLoad={() => setMediaLoaded(true)}
              />
            )}
          </div>
        )}

        {!isImage && !isVideo && (
          <div className='unsupportedMedia'>
            <h2>Unsupported Media Type</h2>
            <p>This APOD entry is not an image or video.</p>
            {data?.url && (
              <a href={data.url} target='_blank' rel='noopener noreferrer'>
                Open Original Media
              </a>
            )}
          </div>
        )}
      </motion.div>

      {!isVideo && <div className='bgGradient'></div>}
      {!isVideo && <div className='bgGrid'></div>}

      {!isVideo && !!data?.media_type && (
        <motion.div
          className='image-badge'
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {isImage ? 'HD APOD IMAGE' : isVideo ? 'APOD VIDEO' : 'APOD MEDIA'}
        </motion.div>
      )}
    </div>
  )
}
