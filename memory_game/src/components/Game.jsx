import React, { useEffect, useState } from 'react';
const _ = require("lodash");

export default function Game({ ImagesArr }) {
  const [shuffledImages, setShuffledImages] = useState(_.shuffle([...ImagesArr, ...ImagesArr]));
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isChecking, setIsChecking] = useState(false);

  const handleDivClick = (divId, url) => {
    if (isChecking || flippedCards.some(card => card.id === divId) || matchedCards.includes(divId)) return;

    if (flippedCards.length < 2) {
      setFlippedCards(prev => [...prev, { id: divId, url }]);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;

      setIsChecking(true);

      setTimeout(() => {
        if (first.url === second.url) {
          setMatchedCards(prev => [...prev, first.id, second.id]);
        }
        setFlippedCards([]);
        setIsChecking(false);
      }, 1000);
    }
  }, [flippedCards]);

  const isCardFlipped = (index) =>
    flippedCards.some(card => card.id === index) || matchedCards.includes(index);

  const handleRestart = () => {
    setShuffledImages(_.shuffle([...ImagesArr, ...ImagesArr]));
    setFlippedCards([]);
    setMatchedCards([]);
    setIsChecking(false);
  };

  if (matchedCards.length === shuffledImages.length) {
    return (
        <div className="win-overlay">
        <div className="win-popup">
          <h2>🎉 You Win! 🎉</h2>
          <button onClick={handleRestart}>Play Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="ImageContainer">
      {shuffledImages.map((item, index) => (
        <div
          id={index}
          className="placeholder"
          key={index}
          onClick={() => handleDivClick(index, item)}
        >
          <img
            src={item}
            className={isCardFlipped(index) ? "active" : "inactive"}
            alt={`img-${index}`}
          />
        </div>
      ))}
    </div>
  );
}
