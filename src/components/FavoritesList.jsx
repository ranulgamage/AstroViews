import { useState, useEffect } from 'react'
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
    >
      <h2 className="favorites-title">
        <Heart size={28} fill="currentColor" />
        Your Favorites
      </h2>
      
      {favorites.length === 0 ? (
        <p className="favorites-empty">
          No favorites yet. Start saving your favorite astronomical views!
        </p>
      ) : (
        <div className="favorites-list">
          {favorites.map((fav, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="favorite-item"
            >
              <div className="favorite-item-content">
                <h3>{fav.title}</h3>
                <p>
                  {new Date(fav.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div className="favorite-item-actions">
                <button
                  className="favorite-action-btn view"
                  onClick={() => viewFavorite(fav.date)}
                >
                  <ExternalLink size={18} />
                </button>
                <button
                  className="favorite-action-btn delete"
                  onClick={() => removeFavorite(fav.date)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      <motion.button
        className="favorites-close-btn"
        onClick={onClose}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Close
      </motion.button>
    </motion.div>
  );
}
