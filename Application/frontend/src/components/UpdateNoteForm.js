import React, { useState } from 'react';

function UpdateNoteForm({ noteId, onClose, onUpdate }) {
  const [newQuote, setNewQuote] = useState('');
  const [newBook, setNewBook] = useState('');
  const [newTheme, setNewTheme] = useState('');
  
  const token = localStorage.getItem('token')

  const handleUpdate = () => {
    const updatedData = {
      quote: newQuote,
      book: newBook,
      theme: newTheme,
    };

    fetch('/update_notes', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        note_id: noteId,
        updated_data: updatedData,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Update response:', data);
        onUpdate(); // Call the onUpdate callback to trigger refetching notes
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  const handleCancel = () => {
    onClose(); // Close the form without updating
  };

  return (
    <div className="update-form-container">
      <input
        type="text"
        placeholder="New Quote"
        value={newQuote}
        onChange={(e) => setNewQuote(e.target.value)}
      />
      <input
        type="text"
        placeholder="New Book"
        value={newBook}
        onChange={(e) => setNewBook(e.target.value)}
      />
      <input
        type="text"
        placeholder="New Theme"
        value={newTheme}
        onChange={(e) => setNewTheme(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Note</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}

export default UpdateNoteForm;