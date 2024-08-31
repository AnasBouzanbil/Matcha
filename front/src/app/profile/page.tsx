'use client';

import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import './page.css';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { UserContext } from '../layout';
import Image from 'next/image';
import Link from 'next/link';




export default function Profile() {
  const [images , setImages] = useState(['']);
  const [name , setName] = useState('');
  const [ username, setUsernmae] = useState('');
  const [email , setemail] = useState('');
  const [profileurl, setProfilePicUrl] = useState('');
  const [bio, setBio] = useState('');
  const path ="http://localhost:4000/uploads/";
  const user = useContext(UserContext);
  useEffect(()=>{
    console.log('data is ')
    console.log(user.user);
    setImages(user.user.images || []);
    setName(user.user.name ||'Error ... ')
    setUsernmae(user.user.username || 'error...')
    setemail(user.user.email);
    setProfilePicUrl(user.user.profilepics ? `http://localhost:4000/uploads/${user.user.profilepics}` : '/default-profile.png'); // Fallback to a default image if needed
    setBio(user.user.bio);
    console.log("user is ")
    console.log(user.user)
    setImages(prevImages => prevImages.map(image => `${path}${image}`));

  },[])







  
  
  return (
    <>
     

      <main className="bg-gray-100 pt-20 bg-opacity-25">
        <div className="lg:w-8/12 lg:mx-auto mb-8">
          <header className="flex flex-wrap items-center p-4 md:py-8">
            <div className="md:w-3/12 md:ml-16">
              <Image
                className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full border-2 border-pink-600 p-1"
                src={profileurl}
                alt="profile"
                width={160}
                height={160}
              />
            </div>

            <div className="w-8/12 md:w-7/12 ml-4">
              <div className="md:flex md:flex-wrap md:items-center mb-4">
                <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                  {username}
                </h2>
                <span
                  className="inline-block fas fa-certificate fa-lg text-blue-500 
                               relative mr-6 text-xl transform -translate-y-2"
                  aria-hidden="true"
                >
                  <i className="fas fa-check text-white text-xs absolute inset-x-0 ml-1 mt-px"></i>
                </span>

                <Link href="#"className="bg-blue-500 px-2 py-1 text-white font-semibold text-sm rounded block text-center sm:inline-block">
                    Edit
                </Link>
              </div>
              <ul className="hidden md:flex space-x-8 mb-4">
                <li>
                  <span className="font-semibold">136</span>
                  Lovers
                </li>

                <li>
                  <span className="font-semibold">40.5k</span>
                  Visits 
                </li>
                <li>
                  <span className="font-semibold">302</span>
                  following
                </li>
                <li>
                  <span className="font-semibold">302</span>
                  followers
                </li>
              </ul>
              <div className="hidden md:block">
                <h1 className="font-semibold">{name}</h1>
                <span>{email}</span>
                <p>{bio}</p>
              </div>
            </div>
            <div className="md:hidden text-sm my-2">
              <h1 className="font-semibold">{name}</h1>
              <span>{bio}</span>
              <p>{email}</p>
            </div>
          </header>

          {/* posts */}
          <div className="px-px md:px-3">
            {/* user following for mobile only */}
            <ul className="flex md:hidden justify-around space-x-8 border-t text-center p-2 text-gray-600 leading-snug text-sm">
              <li>
                <span className="font-semibold text-gray-800 block">136</span>
                posts
              </li>

              <li>
                <span className="font-semibold text-gray-800 block">40.5k</span>
                Lovers
              </li>
              <li>
                <span className="font-semibold text-gray-800 block">302</span>
                Visits
              </li>
            </ul>
            <ul className="flex items-center justify-around md:justify-center space-x-12 uppercase tracking-widest font-semibold text-xs text-gray-600 border-t">

              <li className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
                <button  className="inline-block p-3">
                    <i className="fas fa-th-large text-xl md:text-xs"></i>
                    <span className="hidden md:inline">post</span>
                </button>
              </li>
              <li>
                <button  className="inline-block p-3">
                    <i className="far fa-square text-xl md:text-xs"></i>
                    <span className="hidden md:inline">igtv</span>
                </button>
              </li>
              <li>
                <button  className="inline-block p-3">
                    <i
                      className="fas fa-user border border-gray-500 px-1 pt-1 rounded text-xl md:text-xs"
                    ></i>
                    <span className="hidden md:inline">tagged</span>
                 
                </button>
              </li>
            </ul>
            <div className="  grid grid-cols-3 	justify-center	 jus w-full gap-11 h-1/2 bg-fuchsia-700 flex-wrap images ">

            {
              images.map(image =>{
               
                return (
                  <div className="  p-px ">
                      <article className="post bg-yellow-300 text-white relative pb-full md:mb-6">
  
                        <Image
                          className="w-full h-full absolute left-0 top-0 object-cover"
                          src={path +image}
                          alt="image"
                          layout="fill"
                        />
  
                        <i className="fas fa-square absolute right-0 top-0 m-1"></i>
                        <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden">
                          <div className="flex justify-center items-center space-x-4 h-full">
                            <span className="p-2">
                              <i className="fas fa-heart"></i>
                              412K
                            </span>
  
                            <span className="p-2">
                              <i className="fas fa-comment"></i>
                              2,909
                            </span>
                          </div>
                        </div>
                      </article>
                </div>
                )
              })
            }

            </div>
          </div>
        </div>
      </main>
    </>
  );

}
