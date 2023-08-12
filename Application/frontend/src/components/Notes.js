import React from 'react'
import { useState,useEffect } from 'react'
import useToken from './useToken'
import Navbar from './Navbar';
import Flashcard from './Flashcard';
import './Notes.css';
import UpdateNoteForm from './UpdateNoteForm';
function Notes() {
  
  const [notes, setNote] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showUpdateForm, setShowUpdateForm] = useState(false);



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
  }, [currentCardIndex]); 

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
  
  const handleUpdate = () => {
    setShowUpdateForm(true);
  };





  


  return (
    <div className="notes-container">
      <Navbar />
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
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleUpdate}>Update</button>
      {showUpdateForm && (
       <UpdateNoteForm
       noteId={notes[currentCardIndex]._id}
       onClose={() => setShowUpdateForm(false)} // Close the form without updating
       onUpdate={() => {
         // Refetch notes or update the specific note
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
             setShowUpdateForm(false); // Close the form
           })
           .catch((error) => {
             console.log('Error', error);
           });
       }}
     />
   )}
 </div>
);
}

export default Notes;