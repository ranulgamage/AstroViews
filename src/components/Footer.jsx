import { motion } from 'framer-motion'
import { Download, Info, Heart } from 'lucide-react'
import ShareButton from './ShareButton'
import { downloadFromUrl } from '../utils/download'

export default function Footer(props) {
  const {
    handelDetailPanel,
    data,
    toggleFavorites,
    onDownloadStart,
    onDownloadEnd,
    isDownloading,
  } = props;
  const currentDate = new Date().toLocaleDateString();
  const mediaUrl = data?.hdurl || data?.url;
  
  const handleDownload = async () => {
    if (!mediaUrl || isDownloading) return;

    onDownloadStart?.();
    try {
      const downloaded = await downloadFromUrl(mediaUrl, data?.title || 'apod-media');
      if (!downloaded) {
        window.alert('Download was blocked by the media source. Please try another APOD item.');
      }
    } finally {
      onDownloadEnd?.();
    }
  };

  const renderActionButtons = (compact = false) => (
    <>
      <motion.button
        aria-label="Open favorites"
        onClick={toggleFavorites}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Heart size={16} />
        {compact ? 'Fav' : 'Favorites'}
      </motion.button>
      <ShareButton data={data} compact={compact} />
      <motion.button
        aria-label="Download media"
        onClick={handleDownload}
        disabled={!mediaUrl || isDownloading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Download size={16} />
        {compact ? 'Down' : 'Download'}
      </motion.button>
      <motion.button
        aria-label="Open details panel"
        onClick={handelDetailPanel}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Info size={16} />
        {compact ? 'Info' : 'About'}
      </motion.button>
    </>
  );

  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <motion.div
        className='footer-brand'
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className='brand-row'>
          <h1 className="centered-title">
            AstroViews
          </h1>
          <img src="logo-rgdev.png" width="170" height="52" alt="RGDev Logo" />
        </div>
        <h5 className='mobileResizeH5'>
          Last Updated: {currentDate} | Designer: Ranul Gamage
        </h5>
        <div className='footerRights'>
          <h5>© 2026 RGDev. All rights reserved.</h5>
        </div>
      </motion.div>
      
      <motion.div 
        className='footerButtons footerButtonsDesktop'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {renderActionButtons(false)}
      </motion.div>

      <motion.div
        className='footerMobileDock'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.25 }}
      >
        <div className='footerMobileBrandRow'>
          <span className='footer-mobile-title'>AstroViews</span>
          <img src='logo-rgdev.png' height='26' alt='RGDev Logo' />
        </div>
        {renderActionButtons(true)}
      </motion.div>
    </motion.footer>
  )
}
