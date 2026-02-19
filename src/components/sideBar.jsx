import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { Calendar, Download, X, Heart, Clock } from 'lucide-react'
import { downloadFromUrl } from '../utils/download'

export default function SideBar(props) {
  const {
    handelDetailPanel,
    data,
    setApiDate,
    onDownloadStart,
    onDownloadEnd,
    isDownloading,
  } = props;
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const mediaUrl = data?.hdurl || data?.url;

  useEffect(() => {
    if (!data?.date) return;
    setSelectedDate(data.date);
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.some((fav) => fav.date === data.date));
  }, [data?.date]);

  const handleDateChange = (date) => {
    if (!date) return;

    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    setSelectedDate(formattedDate);
    setApiDate(formattedDate);
    setIsCalendarOpen(false);

    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    const newHistory = [formattedDate, ...history.filter((historyDate) => historyDate !== formattedDate)].slice(0, 10);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const handleDownload = async () => {
    if (!mediaUrl || isDownloading) return;

    onDownloadStart?.();
    try {
      const downloaded = await downloadFromUrl(mediaUrl, data?.title || 'apod-media');
      if (!downloaded) {
        window.alert('Download was blocked by the media source. Please try another APOD item.');
        return;
      }

      const textData = `${data.title}
Date: ${data.date}

Description

${data.explanation}

Copyright\u00A9 1993-2026 ${data.copyright || 'NASA'} All Rights Reserved.`;

      const textBlob = new Blob([textData], { type: 'text/plain' });
      const textLink = document.createElement('a');
      const textBlobUrl = URL.createObjectURL(textBlob);
      textLink.href = textBlobUrl;
      textLink.download = `${data.title}.txt`;
      document.body.appendChild(textLink);
      textLink.click();
      document.body.removeChild(textLink);
      window.setTimeout(() => URL.revokeObjectURL(textBlobUrl), 1200);
    } finally {
      onDownloadEnd?.();
    }
  };

  const toggleFavorite = () => {
    if (!data?.date) return;

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoriteData = {
      date: data.date,
      title: data.title,
      url: mediaUrl,
    };

    const exists = favorites.find((favorite) => favorite.date === data.date);
    if (exists) {
      const newFavorites = favorites.filter((favorite) => favorite.date !== data.date);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(false);
      return;
    }

    localStorage.setItem('favorites', JSON.stringify([favoriteData, ...favorites]));
    setIsFavorite(true);
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
        <div className='sideBarHeader'>
          <motion.button
            className='sideBarCloseBtn'
            onClick={handelDetailPanel}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={20} /> Close
          </motion.button>

          <div className='topSideBarContents'>
            <motion.button
              className={`favorites-button ${isFavorite ? 'active' : ''}`}
              onClick={toggleFavorite}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
              {isFavorite ? 'Saved' : 'Save'}
            </motion.button>

            <motion.button
              className='date-picker-button'
              onClick={() => setIsCalendarOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar size={18} /> Select Date
            </motion.button>

            <motion.button
              onClick={handleDownload}
              className='sideBarDownload'
              disabled={!mediaUrl || isDownloading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={18} />
              Download
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isCalendarOpen && (
            <>
              <motion.div
                className='date-picker-overlay'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCalendarOpen(false)}
              />
              <motion.div
                className='date-picker-modal-wrap'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className='date-picker-modal'
                  initial={{ opacity: 0, y: 30, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className='date-picker-modal-header'>
                    <h3>Select APOD Date</h3>
                    <button
                      className='date-picker-close-btn'
                      onClick={() => setIsCalendarOpen(false)}
                      aria-label='Close date picker'
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <p className='date-picker-modal-subtitle'>
                    Browse NASA APOD from June 16, 1995 to today.
                  </p>
                  <div className='calendar-container'>
                    <DayPicker
                      mode='single'
                      selected={selectedDate ? new Date(selectedDate) : null}
                      onSelect={handleDateChange}
                      disabled={{
                        before: new Date('1995-06-16'),
                        after: new Date(),
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {data?.title}
        </motion.h2>

        <motion.div
          className='sideBarBody'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p><strong>Date:</strong> {data?.date}</p>
          <p className='sectionLabel'><strong>Description</strong></p>
          <p>{data?.explanation}</p>
          <h5>Copyright\u00A9 1993-2026 {data?.copyright || 'NASA'} All Rights Reserved.</h5>
        </motion.div>

        {searchHistory.length > 0 && (
          <motion.div
            className='search-history'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3>
              <Clock size={18} />
              Recent Searches
            </h3>
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
                  day: 'numeric',
                })}
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}
