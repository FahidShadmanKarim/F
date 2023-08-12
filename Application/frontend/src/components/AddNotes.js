import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { getToken } from './useToken';

function AddNotes() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');

  const token = localStorage.getItem('token');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/add_notes', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userInput1: input1,
        userInput2: input2,
        userInput3: input3,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('User input:', input1, input2, input3);
        console.log(data);
        setInput1('');
        setInput2('');
        setInput3('');
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  useEffect(() => {
    // Your other useEffect code here if needed
  }, [token, input1, input2, input3]); // Dependency array with token and input state variables

  const handleInputChange1 = (event) => {
    setInput1(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setInput2(event.target.value);
  };

  const handleInputChange3 = (event) => {
    setInput3(event.target.value);
  };



  return (
    <div>
      <Navbar />

      {/* Centered heading */}
      <h1 className="centered-h1">Enter the note, book name, and theme</h1>

      {/* Input fields */}
      <div style={{ textAlign: 'center' }}>
        <input
          type="text"
          value={input1}
          onChange={handleInputChange1}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '5px solid #ccc',
            fontSize: '24px',
            width: '450px',
            height: '100px',
            fontWeight: 'bold',
            textAlign: 'center', /* Center the text in the input */
            marginTop: '20px',
          }}
          placeholder="Enter Quote"
        />
        <br />
        <input
          type="text"
          value={input2}
          onChange={handleInputChange2}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '5px solid #ccc',
            fontSize: '24px',
            width: '450px',
            height: '50px',
            fontWeight: 'bold',
            textAlign: 'center', /* Center the text in the input */
            marginTop: '10px',
          }}
          placeholder="Enter Book"
        />
        <br />
        <input
          type="text"
          value={input3}
          onChange={handleInputChange3}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '5px solid #ccc',
            fontSize: '24px',
            width: '450px',
            height: '50px',
            fontWeight: 'bold',
            textAlign: 'center', /* Center the text in the input */
            marginTop: '10px',
          }}
          placeholder="Enter Theme"
        />
        <br />
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: 'rgb(15, 231, 166)',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '4px',
            border: 'none',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '20px',
          }}
        >
          Submit
        </button>
     
      </div>
    </div>
  );
}

export default AddNotes;
