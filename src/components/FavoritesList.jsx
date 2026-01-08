import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Trash2, ExternalLink } from 'lucide-react'

export default function FavoritesList({ setApiDate, onClose }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (date) => {
    const newFavorites = favorites.filter(f => f.date !== date);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const viewFavorite = (date) => {
    setApiDate(date);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="favorites-modal"
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.98) 0%, rgba(10, 14, 39, 0.98) 100%)',
        backdropFilter: 'blur(20px)',
        padding: '2rem',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto',
        zIndex: 1001
      }}
    >
      <h2 style={{ 
        fontSize: '2rem', 
        marginBottom: '1.5rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        <Heart size={28} style={{ display: 'inline', marginRight: '0.5rem' }} fill="currentColor" />
        Your Favorites
      </h2>
      
      {favorites.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
          No favorites yet. Start saving your favorite astronomical views!
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {favorites.map((fav, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{fav.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  {new Date(fav.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => viewFavorite(fav.date)}
                  style={{
                    background: 'var(--accent-color)',
                    border: 'none',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    color: 'white'
                  }}
                >
                  <ExternalLink size={18} />
                </button>
                <button
                  onClick={() => removeFavorite(fav.date)}
                  style={{
                    background: '#dc2626',
                    border: 'none',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    color: 'white'
                  }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      <motion.button
        onClick={onClose}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          marginTop: '1.5rem',
          padding: '1rem 2rem',
          background: 'var(--gradient-primary)',
          border: 'none',
          borderRadius: '12px',
          color: 'white',
          cursor: 'pointer',
          width: '100%',
          fontWeight: '600'
        }}
      >
        Close
      </motion.button>
    </motion.div>
  );
}
