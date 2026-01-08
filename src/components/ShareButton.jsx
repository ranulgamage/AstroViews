import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Share2, Check, Copy } from 'lucide-react'

export default function ShareButton({ data }) {
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: data.title,
      text: `Check out this amazing astronomy picture: ${data.title}`,
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
        onClick={handleShare}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--glass-border)',
          color: 'var(--text-primary)',
          padding: '0.75rem 1.25rem',
          fontSize: '0.875rem',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '500',
          cursor: 'pointer',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <Share2 size={18} /> Share
      </motion.button>

      <AnimatePresence>
        {showShare && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(26, 31, 58, 0.98)',
              backdropFilter: 'blur(20px)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              zIndex: 1001,
              textAlign: 'center'
            }}
          >
            <h3 style={{ marginBottom: '1rem' }}>Share this view</h3>
            <motion.button
              onClick={copyLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: copied ? '#10b981' : 'var(--accent-color)',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '12px',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                margin: '0 auto'
              }}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? 'Copied!' : 'Copy Link'}
            </motion.button>
            <button
              onClick={() => setShowShare(false)}
              style={{
                marginTop: '1rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
