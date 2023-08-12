import React from 'react';
import { Link } from 'react-router-dom';

function VerticalNavbar() {
  return (
    <nav className="vertical-navbar">
      <ul>
      <li>
          <Link to = "/notes">Notes</Link>
        </li>
        <li>
          <Link to = "/add-notes">Add Notes</Link>
        </li>
        <li>
          <Link to="/logout">Log Out</Link>
        </li>
      </ul>
    </nav>
  );
}

export default VerticalNavbar;