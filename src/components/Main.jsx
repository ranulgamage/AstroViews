import React from 'react'

export default function Main(props) {
  const {data}=props;
  return (
    <div className='imgContainer'>
      <img src={data.hdurl||"galaxy-image.png"} alt={data.title || "Picture Of Our Galaxy The Milky Way Galaxy(Hint:it mite be but its not)"} className='bgImage' />
    </div>
  )
}
