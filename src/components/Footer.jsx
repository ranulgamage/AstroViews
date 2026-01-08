import React from 'react'
import { motion } from 'framer-motion'
import { Download, Info, Heart } from 'lucide-react'
import ShareButton from './ShareButton'

export default function Footer(props) {
  const { handelDetailPanel, data, toggleFavorites } = props;
  const currentDate = new Date().toLocaleDateString();
  
  const handleDownload = () => {
    const imageUrl = data.hdurl;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = data.title + '.jpg';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className='bgGradient'></div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h1 className="centered-title">
          AstroViews by
          <img src="logo-rgdev.png" width="300px" height="100px" alt="RGDev Logo" />
        </h1>
        <h5 className='mobileResizeH5'>
          Page Last Updated: {currentDate} | Page Designer: Ranul Gamage
        </h5>
        <div className='footerRights'>
          <h5>© 2024 RGDev. All rights reserved.</h5>
        </div>
      </motion.div>
      
      <motion.div 
        className='footerButtons'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <motion.button 
          onClick={toggleFavorites}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart size={16} /> Favorites
        </motion.button>
        <ShareButton data={data} />
        <motion.button 
          onClick={handleDownload}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download size={16} /> Download
        </motion.button>
        <motion.button 
          onClick={handelDetailPanel}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Info size={16} /> About
        </motion.button>
      </motion.div>
    </motion.footer>
  )
}
