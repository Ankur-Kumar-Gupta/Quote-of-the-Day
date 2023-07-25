import React, { useState, useEffect } from "react";
import "./RandomQuote.css";

const RandomQuote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const fetchRandomQuote = () => {
    fetch("http://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.content);
        setAuthor(data.author);
      })
      .catch((error) => console.log("Error fetching quote:", error));
  };

  // Handle card animation
  const handleMouseMove = (event) => {
    const card = document.querySelector('.card');
    const { clientX, clientY } = event;
    const cardRect = card.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    const percentX = (clientX - cardCenterX) / (cardRect.width / 2);
    const percentY = (clientY - cardCenterY) / (cardRect.height / 2);
    const rotationAngleX = 10 * percentX;
    const rotationAngleY = 10 * percentY;
  
    card.style.transform = `perspective(1000px) rotateY(${rotationAngleX}deg) rotateX(${rotationAngleY}deg)`;
  };

  const resetAnimation = () => {
    const card = document.querySelector('.card');
    card.style.transform = 'none';
  };

  useEffect(() => {
    const card = document.querySelector('.card');

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', resetAnimation);

    // Clean up event listeners when the component unmounts
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', resetAnimation);
    };
  }, []);

  return (
    <div className="card">
      <div className="random-quote">
        <div className="quote-area">
          <i className="fas fa-quote-left"></i>
          <p className="quote">{quote}</p>
          <i className="fas fa-quote-right"></i>
        </div>
        <div className="author">
          <span className="name">{author}</span>
        </div>
        <button onClick={fetchRandomQuote}>New Quote</button>
      </div>
    </div>
  );
};

export default RandomQuote;
