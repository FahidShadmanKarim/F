import React from 'react';
import './Flashcard.css'; 

const Flashcard = ({ theme, quote, book }) => {
  return (
    <div className="flashcard">
      <p>Theme: {theme}</p>
      <p>Quote: {quote}</p>
      <p>Book: {book}</p>
    </div>
  );
};

export default Flashcard;