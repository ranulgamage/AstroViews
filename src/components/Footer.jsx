import React from 'react'

export default function Footer(props) {
   const{handelDetailPanel,data}=props;
  const currentDate = new Date().toLocaleDateString();
  const handleDownload = () => {
    const imageUrl =data.hdurl;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = data.title+'.jpg';
    link.target = '_blank'; 
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        <button onClick={handleDownload}>
          <i className="fa-solid fa-download"></i> Download
        </button>
        <button onClick={handelDetailPanel}>
          <i className="fa-solid fa-circle-info"></i> About
        </button>
      </div>
      <div className='footerImgName'><h2>
        {data?.title} 
      </h2></div>
    </footer>

  )
}
