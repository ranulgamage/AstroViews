import React from 'react'

export default function Footer() {
  const currentDate = new Date().toLocaleDateString();

  return (
    <footer>
    <div>
      <h2>
      Picture Of Our Galaxy The Milky Way Galaxy
      </h2>
      <h1 className="centered-title">
      AstroView by       
      <img src="log-rgdev.png" width="300px" height="100px"/>
      </h1>
      <h5>Page Last Updated: {currentDate}|           |Page Designer: Ranul Gamage</h5>
    </div>
    <button>
       <i className="fa-solid fa-circle-info"></i>
    </button>
       
       <h5 className='bottomInfor'>© 2024 RGDev. All rights reserved.</h5>
       
    </footer>
    
  )
}
