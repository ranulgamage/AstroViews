import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/sideBar"
import ReactLoading from 'react-loading';
import InfoNote from "./components/InfoNote";

function App() {
  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState(null);
  const [showInfoNote, setShowInfoNote] = useState(true);
  const [loadingPage, setLoadingPage] = useState(false);

  function handelDetailPanel() {
    setShowDetails(!showDetails);
  }

  function handleCloseInfoNote() {
    setShowInfoNote(false);
  }

  useEffect(() => {
    async function fetchAPIData() {
      const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;
      const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_API_KEY}`
      let currentDate = new Date();
      let options = {
        timeZone: 'America/New_York',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      let today = currentDate.toLocaleDateString('en-US', options);
      const localKey = `NASA-APOD-${today}`;
      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey));
        setData(apiData);
        console.log("Fetch Data From Browser cache");
        return;
      }
      try {
        if (data == null) {
          localStorage.clear();
          const response = await fetch(url);
          const dataAPI = await response.json();
          localStorage.setItem(localKey, JSON.stringify(dataAPI));
          setData(dataAPI);
          console.log("Fetch Data From NASA API DATA\n", dataAPI);
        }
      } catch (e) {
        console.log(e.message);
      }
    }
    fetchAPIData();
  }, []);
  return (
    <>
      {showInfoNote && <InfoNote handleClose={handleCloseInfoNote} />}
      {data ? (<Main data={data} />) : (
        <div className="loadingPage">
          <ReactLoading type="spinningBubbles" color="#007bff" height={100} width={100} />
          <h1>Loading...</h1>
        </div>
      )}
      {showDetails && (<SideBar data={data} handelDetailPanel={handelDetailPanel} />)}
      {data && (<Footer data={data} handelDetailPanel={handelDetailPanel} />)}
    </>
  )
}

export default App
