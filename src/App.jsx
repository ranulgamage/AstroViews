import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/sideBar"
import ReactLoading from 'react-loading'
import InfoNote from "./components/InfoNote"
import FavoritesList from "./components/FavoritesList"

function App() {
  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState(null);
  const [showInfoNote, setShowInfoNote] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  let currentDate = new Date();
  let options = { timeZone: 'America/New_York' };
  let dateInNY = new Date(currentDate.toLocaleString('en-US', options));
  let year = dateInNY.getFullYear();
  let month = (dateInNY.getMonth() + 1).toString().padStart(2, '0');
  let day = dateInNY.getDate().toString().padStart(2, '0');
  let formattedDate = `${year}-${month}-${day}`;
  const [apiDate, setApiDate] = useState(formattedDate);
  
  function handelDetailPanel() {
    setShowDetails(!showDetails);
  }

  function handleCloseInfoNote() {
    setShowInfoNote(false);
  }

  function toggleFavorites() {
    setShowFavorites(!showFavorites);
  }
  
  useEffect(() => {
    async function fetchAPIData() {
      const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;
      const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_API_KEY}` + `&date=${apiDate}` + '&thumbs=true';
      console.log("API Date: " + apiDate);
      const localKey = `NASA-APOD-${apiDate}`;
      
      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey));
        setData(apiData);
        console.log("Fetch Data From Browser cache");
        return;
      }
      
      try {
        if (localStorage.length >= 10) {
          // Keep favorites and history, clear only image cache
          const favorites = localStorage.getItem('favorites');
          const history = localStorage.getItem('searchHistory');
          localStorage.clear();
          if (favorites) localStorage.setItem('favorites', favorites);
          if (history) localStorage.setItem('searchHistory', history);
        }
        
        const response = await fetch(url);
        const dataAPI = await response.json();
        
        if (dataAPI?.code == "400") {
          dataAPI.title = "Date must be between Jun 16, 1995 and " + dateInNY.toDateString();
          setData(dataAPI);
        }
        
        if (dataAPI?.code != "404" && dataAPI?.code != "400") {
          localStorage.setItem(localKey, JSON.stringify(dataAPI));
          setData(dataAPI);
          console.log("Fetch Data From NASA API DATA\n", dataAPI);
        }
      } catch (e) {
        console.log(e.message);
      }
    }
    fetchAPIData();
  }, [apiDate]);
  
  return (
    <div className="app-shell">
      <AnimatePresence>
        {showInfoNote && <InfoNote handleClose={handleCloseInfoNote} />}
      </AnimatePresence>
      
      {data ? (
        <Main data={data} />
      ) : (
        <div className="loadingPage">
          <ReactLoading type="spinningBubbles" color="#1f7bff" height={100} width={100} />
          <h1>Loading...</h1>
        </div>
      )}
      
      <AnimatePresence>
        {showDetails && (
          <SideBar 
            setApiDate={setApiDate} 
            data={data} 
            handelDetailPanel={handelDetailPanel}
            onDownloadStart={() => setIsDownloading(true)}
            onDownloadEnd={() => setIsDownloading(false)}
            isDownloading={isDownloading}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFavorites && (
          <>
            <div className="favorites-overlay" onClick={toggleFavorites} />
            <FavoritesList setApiDate={setApiDate} onClose={toggleFavorites} />
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDownloading && (
          <div className="downloadLoadingOverlay">
            <div className="downloadLoadingCard">
              <div className="downloadLoadingSpinner">
                <ReactLoading type="spinningBubbles" color="#56b3ff" height={78} width={78} />
              </div>
              <h2>Preparing download...</h2>
              <p>Fetching media file from source</p>
            </div>
          </div>
        )}
      </AnimatePresence>
      
      {data && (
        <Footer
          data={data}
          handelDetailPanel={handelDetailPanel}
          toggleFavorites={toggleFavorites}
          onDownloadStart={() => setIsDownloading(true)}
          onDownloadEnd={() => setIsDownloading(false)}
          isDownloading={isDownloading}
        />
      )}
    </div>
  )
}

export default App
