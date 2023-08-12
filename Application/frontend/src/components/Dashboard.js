import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function Dashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Perform the GET request to fetch user profile data from the backend
    fetch('/my_profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(data => {
      // Update the state with the fetched user data
      setUserData(data);
    })
    .catch(err => {
      console.log(err.message);
    });
  }, []);

  return (
    <div>
      <Navbar/>
      <h1>Welcome to the dashboard</h1>
      {userData ? (
        <div>
          <p>{userData.name}</p>
          {/* <p>Email: {userData.email}</p> */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <button><Link to="/logout">Log Out</Link></button>
    </div>
  );
}

export default Dashboard;