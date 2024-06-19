import { useState } from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/sideBar"

function App() {
  const NASA_API_KEY=import.meta.env.NASA_API_KEY;
  const [showDetails, setShowDetails] = useState(false);
  function handelDetailPanel(){
    setShowDetails(!showDetails);
  }
  return (
    <>
      <Main />
      {showDetails && (<SideBar handelDetailPanel={handelDetailPanel} />)}
      <Footer handelDetailPanel={handelDetailPanel} />
    </>
  )
}

export default App
