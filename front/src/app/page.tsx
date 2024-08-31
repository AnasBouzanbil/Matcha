// pages/index.tsx

'use client'

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {Navbar} from './Navbar';


const Title = ()=>{
    return (
        <div className='texttitle'>
            <h1 className='text1'>
              when You Would Like 
            </h1>
            <h2 className='text2'>
              To Go On A Date ?
            </h2>
            <p className='headtitle'>
              we are aimed to help you find the perfect relaionship .
            </p>
        </div>
    )
}




const Home = () => {
  return (
    <div>
          <main className="flex pt-[5%] flex-col  Home ">
             <Title/>
             <button className='btn'
             onClick={()=>{
              fetch('http://localhost:4000/jwt', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': 'Bearer ' + localStorage.getItem('jwt'),
                },
              })
              .then((res) => res.json()
            )
              .then((data) => {
                localStorage.setItem('jwt', data.token);
                toast.success('Token generated successfully');
              })
             }}
             >Get Started</button>
    
    <button className='btn'
    onClick={()=>{
      fetch('http://localhost:4000/decode-token', { // Use correct route for verification
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: 
          JSON.stringify({
            token: localStorage.getItem('jwt'),
          }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.userId) {
            toast.success(`User ID: ${data.userId}`);
          } else {
            toast.error('Failed to decode token');
          }
        })
        .catch((error) => {
          toast.error('Failed to verify token');
          console.error('Error:', error);
        });
    }
  }
    
    >Login</button>

    </main>
    </div>
  );
};

export default Home;
