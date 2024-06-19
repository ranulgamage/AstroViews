import React from 'react'

export default function SideBar(props) {
  const {handelDetailPanel}=props;
  return (
    <div className='sideBar'>
      <div className='bgOverlay'></div>
      <div className='sideBarContents'>
        <div>
          <button onClick={handelDetailPanel}>
            <i className="fa-solid fa-arrow-right"></i> 
          </button>
          <button className='sideBarDownload'>
            <i className="fa-solid fa-download"></i> Download
          </button>
        </div>
        <h2>
          Picture Of Our Galaxy The Milky Way Galaxy
        </h2>
        <div>
          <p>Picture of Our Galaxy: The Milky Way</p>
          <p>The Milky Way Galaxy, our cosmic home, is a stunning barred spiral galaxy stretching about 100,000 light-years in diameter.
            It houses hundreds of billions of stars, including our Sun, and features a dynamic blend of stars, planets, nebulae, and cosmic phenomena.</p>
        </div>
      </div>
    </div>
  )
}
