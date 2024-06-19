import React from 'react';

const InfoNote = ({ handleClose }) => {
  return (
    <div className="infoNote">
      <div className="infoNote-content">
        <h2 className='noteLogo'>AstroViews</h2>
        <img src="vite.svg" width="300px" height="100px" />
        <p>
          AstroViews is a web-based application that displays a new astronomical image daily. Users can download these images and their detailed information.
          To access more information, click "About," and to download an image, click "Download.
          "AstroViews uses the NASA APOD API, with all rights to the images and information belonging to NASA.
        </p>
        <button onClick={handleClose}><i className="fa-solid fa-circle-xmark"></i> Close</button>
      </div>
    </div>
  );
};

export default InfoNote;
