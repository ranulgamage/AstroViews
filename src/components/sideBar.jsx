import { set } from 'date-fns/fp/set';
import React, { useState } from 'react'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { FaCalendarAlt } from 'react-icons/fa';
export default function SideBar(props) {
  const { handelDetailPanel, data, setApiDate } = props;
  let currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateChange = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    console.log("Arrived Date:"+formattedDate);
    setSelectedDate(formattedDate);
    setApiDate(formattedDate);
    setIsCalendarOpen(false);
  };

  const handleDownload = () => {
    const imageUrl = data.hdurl;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = data.title + '.jpg';
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
    textLink.download = data.title + '.txt';
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
          <div className='topSideBarContents'>
          <button
            className="date-picker-button"
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          >
            <FaCalendarAlt /> Select Date
          </button>
          {isCalendarOpen && (
            <div className="calendar-container">
              <DayPicker
                mode="single"
                selected={selectedDate ? new Date(selectedDate) : null}
                onSelect={handleDateChange}
              />
            </div>
          )}
          <button onClick={handleDownload} className='sideBarDownload'>
            <i className="fa-solid fa-download"></i> Download
          </button>
        </div>
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
