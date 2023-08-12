import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import '../index.css';

function Signin(props) {
  

  return (
      
        <div className="App">
              <button className='Google-LogIn'>
                <GoogleLogin
                    onSuccess={credentialResponse => {

                    var token = credentialResponse.credential;
                    fetch('/google', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        access_token: token
                      })
          
                    }).then((response) => response.json())
                    .then((data) => {
                      console.log(data.access_token)
                      localStorage.setItem('token',data.access_token)
                      props.updateToken(true) 
                    })
                    .catch((err) => {
                      console.log(err.message)
                    })
                    
                }}
                    onError={() => {
                    console.log('Login Failed')
                }}/>
              </button>
            
           
              
      </div>
   
  )
}

export default Signin
