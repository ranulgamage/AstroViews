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
            <Sparkles size={40} className="noteIcon" />
            AstroViews
          </h2>
        </motion.div>
        
        <motion.img 
          src="logo-rgdev.png" 
          width="220" 
          height="70" 
          alt="RGDev Logo"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        />
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          AstroViews presents NASA&apos;s Astronomy Picture of the Day in a redesigned cinematic interface.
          Explore deep space with HD imagery, context-rich notes, and fast date navigation.
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{ marginTop: '1rem' }}
        >
          <strong>Features:</strong> Save favorites, browse recent history, download image packs, and share discoveries.
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
