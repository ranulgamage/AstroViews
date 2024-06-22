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
  useEffect(() => {
    async function fetchAPIData() {
      const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;
      const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_API_KEY}`+`&date=${apiDate}`;
      console.log("API Date: "+apiDate+" URL: ");
      const localKey = `NASA-APOD-${apiDate}`;
      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey));
        setData(apiData);
        console.log("Fetch Data From Browser cache");
        return;
      }
      try {
        if(localStorage.length>=10){
          localStorage.clear();
        }
          const response = await fetch(url);
          const dataAPI = await response.json();
          if(dataAPI?.code=="400"){
            dataAPI.title="Date must be between Jun 16, 1995 and "+dateInNY.toDateString();
            setData(dataAPI);
          }
          if(dataAPI?.code!="404" && dataAPI?.code!="400"){
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
    <>
      {showInfoNote && <InfoNote handleClose={handleCloseInfoNote} />}
      {data ? (<Main data={data} />) : (
        <div className="loadingPage">
          <ReactLoading type="spinningBubbles" color="#007bff" height={100} width={100} />
          <h1>Loading...</h1>
        </div>
      )}
      {showDetails && (<SideBar setApiDate={setApiDate}data={data} handelDetailPanel={handelDetailPanel} />)}
      {data && (<Footer data={data} handelDetailPanel={handelDetailPanel} />)}
    </>
  )
}

export default App
