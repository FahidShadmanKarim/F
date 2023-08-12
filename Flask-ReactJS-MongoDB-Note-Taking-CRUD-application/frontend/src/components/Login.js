import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Logout from './Logout'
import { Link } from "react-router-dom";
import Signin from './Signin';
import { Navigate } from "react-router-dom";


function Login(props) {

  const [profileData, setProfileData] = useState(null)
  const [hasToken, setHasToken] = useState(false)

  function getData() {
    function getToken() {
      const userToken = localStorage.getItem('token')
      return userToken
    }
  }
  return (
    <>
      {!hasToken && <Signin updateToken = {setHasToken} />}
      {hasToken && (
         <Navigate to="/dashboard" replace={true} />
        // <button><Link to="/logout">Log Out</Link></button> 
      )}
    </>

  );
}
export default Login;