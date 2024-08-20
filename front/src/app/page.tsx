// pages/index.tsx

'use client'

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Navbar from './Navbar';


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

      <Navbar />
          <main className="flex pt-[5%] flex-col  Home ">
             <Title/>
      

    </main>
    </div>
  );
};

export default Home;
