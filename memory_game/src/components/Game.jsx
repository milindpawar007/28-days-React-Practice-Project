import React from 'react';

export default function Game({ ImagesArr }) {
 // Should log the array passed as prop

  return (
    <div className='ImageContainer'>
      
      {ImagesArr.map((item, index) => (
        <img src={item} alt="index" key={index}/>
      ))}
    </div>
  );
}
