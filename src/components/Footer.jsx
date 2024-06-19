import React from 'react'

export default function Footer(props) {
   const{handelDetailPanel}=props;
  const currentDate = new Date().toLocaleDateString();

  return (
    <footer>
      <div className='bgGradient'></div>
      <div>
        <h1 className="centered-title">
          AstroView by
          <img src="log-rgdev.png" width="300px" height="100px" />
        </h1>
        <h5>Page Last Updated: {currentDate}|           |Page Designer: Ranul Gamage</h5>
        <div className='footerRights'>
          <h5>© 2024 RGDev. All rights reserved.</h5>
        </div>

      </div>
      <div className='footerButtons'>
        <button>
          <i className="fa-solid fa-download"></i> Download
        </button>
        <button onClick={handelDetailPanel}>
          <i className="fa-solid fa-circle-info"></i> About
        </button>
      </div>
      <div className='footerImgName'><h2>
        Picture Of Our Galaxy The Milky Way Galaxy
      </h2></div>
    </footer>

  )
}
