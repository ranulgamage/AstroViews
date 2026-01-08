import React from 'react'
import { motion } from 'framer-motion'
import { X, Sparkles } from 'lucide-react'

const InfoNote = ({ handleClose }) => {
  return (
    <motion.div 
      className="infoNote"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose}
    >
      <motion.div 
        className="infoNote-content"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          type: 'spring', 
          stiffness: 300, 
          damping: 25,
          delay: 0.1 
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
        >
          <h2 className='noteLogo'>
            <Sparkles size={40} style={{ display: 'inline', marginRight: '0.5rem' }} />
            AstroViews
          </h2>
        </motion.div>
        
        <motion.img 
          src="vite.svg" 
          width="300px" 
          height="100px" 
          alt="Vite Logo"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        />
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          AstroViews is a modern web application that displays stunning astronomical images daily from NASA's APOD API. 
          Explore the cosmos with high-definition imagery, detailed descriptions, and the ability to save your favorite views.
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{ marginTop: '1rem' }}
        >
          <strong>New Features:</strong> Save favorites, browse history, download images, and explore different dates with our intuitive calendar.
        </motion.p>
        
        <motion.button 
          onClick={handleClose}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <X size={20} /> Close
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default InfoNote
