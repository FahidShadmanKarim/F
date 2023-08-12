import React from 'react'
import { useState,useEffect } from 'react'
import useToken from './useToken'
import Navbar from './Navbar';
import Flashcard from './Flashcard';
import './Notes.css';

function Notes() {

  const [notes, setNote] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  

   
  const token = localStorage.getItem('token')
  
  useEffect(() => {
    fetch('/get_notes', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNote(data);
        console.log(data);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  }, []); // Empty dependency array makes the effect run only once when the component is mounted

  const handleNext = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % notes.length);
  };

  const handlePrev = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + notes.length) % notes.length);
  };

  const handleDelete = () => {
    const noteId = notes[currentCardIndex]._id;
    console.log(noteId)
    // Send a DELETE request to the backend with the noteId as a URL parameter
    fetch('/delete_notes', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         note_id:noteId
      }),
    })
      .then((response) => response.json())
      .then((data) => {
       
        console.log('Note deleted:', data);
        //Remove the deleted note from the local state
        setNote((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
        // Reset the currentCardIndex if needed
        if (currentCardIndex === notes.length - 1) {
          setCurrentCardIndex(0);
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };


  return (
    <div className="notes-container">
     <Navbar/>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Notes</h1>
      <div className="flashcard-container">
        {notes.length > 0 && (
          <Flashcard
            theme={notes[currentCardIndex].theme}
            quote={notes[currentCardIndex].quote}
            book={notes[currentCardIndex].book}
          />
        )}
      </div>
      <div className="button-container">
        <button onClick={handlePrev} disabled={notes.length <= 1}>
          Previous
        </button>
        <button onClick={handleNext} disabled={notes.length <= 1}>
          Next
        </button>
      </div>
      <button onClick={() => handleDelete(notes._id)}>Delete</button>
    </div>
  );
}

export default Notes;