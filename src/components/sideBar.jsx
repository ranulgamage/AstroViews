import React from 'react'

export default function SideBar(props) {
  const { handelDetailPanel, data } = props;
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
    const textData = `${data.title}
    Date: ${data.date}
    
    Description
    
    ${data.explanation}
    
    Copyright© 1993-2024 ${data.copyright} At NASA All Rights Reserved.`;
    const textBlob = new Blob([textData], { type: 'text/plain' });
    const textLink = document.createElement('a');
    textLink.href = URL.createObjectURL(textBlob);
    textLink.download = data.title+'.txt';
    document.body.appendChild(textLink);
    textLink.click();
    document.body.removeChild(textLink);
    console.log(textData);
  };
  return (
    <div className='sideBar'>
      <div className='bgOverlay'></div>
      <div className='sideBarContents'>
        <div>
          <button onClick={handelDetailPanel}>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
          <button onClick={handleDownload}className='sideBarDownload'>
            <i className="fa-solid fa-download"></i> Download
          </button>
        </div>
        <h2>
          {data?.title}
        </h2>
        <div>
        <p>Date: {data?.date}</p>
          <p>Description</p>
          <p>{data?.explanation}</p>
          <h5>Copyright© 1993-2024 {data?.copyright} At NASA All Rights Reserved.</h5>
        </div>
      </div>
    </div>
  )
}
