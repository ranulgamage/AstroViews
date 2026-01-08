import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { Calendar, Download, X, Heart, Clock } from 'lucide-react'

export default function SideBar(props) {
  const { handelDetailPanel, data, setApiDate } = props;
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleDateChange = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setSelectedDate(formattedDate);
    setApiDate(formattedDate);
    setIsCalendarOpen(false);
    
    // Save to search history
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    const newHistory = [formattedDate, ...history.filter(d => d !== formattedDate)].slice(0, 10);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

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
    
    const textData = `${data.title}
Date: ${data.date}

Description

${data.explanation}

Copyright© 1993-2024 ${data.copyright} At NASA All Rights Reserved.`;
    const textBlob = new Blob([textData], { type: 'text/plain' });
    const textLink = document.createElement('a');
    textLink.href = URL.createObjectURL(textBlob);
    textLink.download = data.title + '.txt';
    document.body.appendChild(textLink);
    textLink.click();
    document.body.removeChild(textLink);
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoriteData = {
      date: data.date,
      title: data.title,
      url: data.hdurl
    };
    
    const exists = favorites.find(f => f.date === data.date);
    if (exists) {
      const newFavorites = favorites.filter(f => f.date !== data.date);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      localStorage.setItem('favorites', JSON.stringify([favoriteData, ...favorites]));
      setIsFavorite(true);
    }
  };

  const searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');

  return (
    <motion.div 
      className='sideBar'
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className='bgOverlay' onClick={handelDetailPanel}></div>
      <motion.div 
        className='sideBarContents'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button 
          onClick={handelDetailPanel}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <X size={20} /> Close
        </motion.button>
        
        <div className='topSideBarContents'>
          <motion.button
            className="favorites-button"
            onClick={toggleFavorite}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} /> 
            {isFavorite ? 'Saved' : 'Save'}
          </motion.button>
          
          <motion.button
            className="date-picker-button"
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calendar size={18} /> Select Date
          </motion.button>
          
          <AnimatePresence>
            {isCalendarOpen && (
              <motion.div 
                className="calendar-container"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <DayPicker
                  mode="single"
                  selected={selectedDate ? new Date(selectedDate) : null}
                  onSelect={handleDateChange}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.button 
            onClick={handleDownload} 
            className='sideBarDownload'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={18} /> Download
          </motion.button>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {data?.title}
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p><strong>Date:</strong> {data?.date}</p>
          <p style={{ marginTop: '1rem' }}><strong>Description</strong></p>
          <p style={{ marginTop: '0.5rem' }}>{data?.explanation}</p>
          <h5>Copyright© 1993-2024 {data?.copyright} At NASA All Rights Reserved.</h5>
        </motion.div>

        {searchHistory.length > 0 && (
          <motion.div 
            className='search-history'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3><Clock size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />Recent Searches</h3>
            {searchHistory.slice(0, 5).map((date, index) => (
              <motion.div 
                key={index} 
                className='history-item'
                onClick={() => {
                  setApiDate(date);
                  setSelectedDate(date);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {new Date(date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}
