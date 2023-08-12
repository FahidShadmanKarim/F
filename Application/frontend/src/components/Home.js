import { Button } from 'bootstrap';
import React from 'react'
import { Link } from "react-router-dom";
import '../index.css';

function Home() {

const signInButtonStyle = {
    display: 'flex',
    backgroundColor: 'white',
    padding: '10px',
    marginTop: '10px',
    position: 'absolute',
    left: '47%',
    width: '150px',
    height: '60px',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: '600',
    border: 'solid white',
    borderRadius: '10px',
    cursor: 'pointer',
    bottom: '450px',
    color: 'black', // Set the text color explicitly to black
  };

  return (
    <div className="board">
      <div className='Intro-text'>
        Vocabulary Application
      </div>
      <div className='Intro-text1'>Virtual custom dictionary, randomized quiz for spaced repetition</div>
      <div className='signin'>
        {/* Apply the inline styles */}
        <Link to="/login">
          <button className='signin-button' style={signInButtonStyle}>
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;