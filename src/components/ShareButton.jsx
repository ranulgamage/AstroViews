import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Share2, Check, Copy } from 'lucide-react'

export default function ShareButton({ data, compact = false }) {
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const mediaLabel = data?.media_type === 'video' ? 'astronomy video' : 'astronomy picture';
    const shareData = {
      title: data.title,
      text: `Check out this amazing ${mediaLabel}: ${data.title}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      setShowShare(true);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setShowShare(false);
    }, 2000);
  };

  return (
    <>
      <motion.button
        className="footer-share-btn"
        aria-label="Share this APOD"
        onClick={handleShare}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Share2 size={18} />
        {compact ? 'Send' : 'Share'}
      </motion.button>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {showShare && (
            <>
              <motion.div
                className="share-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowShare(false)}
              />
              <div className="share-modal-wrap">
                <motion.div
                  className="share-modal"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <h3>Share this view</h3>
                  <p>Copy the link and send this APOD page to others.</p>
                  <motion.button
                    className={`share-copy-btn ${copied ? 'is-copied' : ''}`}
                    onClick={copyLink}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                    {copied ? 'Copied!' : 'Copy Link'}
                  </motion.button>
                  <button
                    className="share-close-btn"
                    onClick={() => setShowShare(false)}
                  >
                    Close
                  </button>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
