import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Main(props) {
  const { data } = props;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className='imgContainer'>
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ 
          opacity: imageLoaded ? 1 : 0, 
          scale: imageLoaded ? 1 : 1.1,
          x: mousePosition.x,
          y: mousePosition.y
        }}
        transition={{ 
          opacity: { duration: 0.8 },
          scale: { duration: 0.8 },
          x: { duration: 0.5, ease: "easeOut" },
          y: { duration: 0.5, ease: "easeOut" }
        }}
        style={{ height: '100%', width: '100%' }}
      >
        <img 
          src={data.hdurl || "galaxy-image.png"} 
          alt={data.title || "Picture Of Our Galaxy The Milky Way Galaxy"} 
          className='bgImage'
          onLoad={() => setImageLoaded(true)}
        />
      </motion.div>
      <div className='bgGradient'></div>
      
      {data.media_type === 'image' && (
        <div className='image-badge'>
          📸 HD Image
        </div>
      )}
    </div>
  )
}
