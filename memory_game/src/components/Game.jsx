import React, { useState } from 'react';
const _ = require("lodash");

export default function Game({ ImagesArr }) {
    // Should log the array passed as prop
   
    const [activeDiv, setActiveDiv] = useState(null);
    const [updatedArray, setAupdatedArray] = useState(_.shuffle([...ImagesArr,...ImagesArr]));

    const handleDivClick = (divId) => {
        setActiveDiv(prev => (prev === divId ? null : divId));
    };

    return (
        <div className='ImageContainer'>
            {(updatedArray).map((item, index) => (
                <div
                    id={index}
                    className="placeholder"
                    key={index}
                    onClick={() => handleDivClick(index)} // Fix: use arrow function
                >

                    <img src={item} className={activeDiv === index ? "active" : "Inactive"} alt={`img-${index}`} />
                </div>
            ))}
        </div>
    );
}
