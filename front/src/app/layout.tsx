'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { createContext, useState, useEffect } from "react";

import socket from "./socket";
import { Navbar } from "./Navbar";

function Looad (){
  return (

      <html lang="en">
      <body className={inter.className}>
    <div className='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
 	<span className='sr-only'>Loading...</span>
  	<div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	<div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	<div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
</div>
        <Toaster />
      </body>
    </html>
  )
}

const inter = Inter({ subsets: ["latin"] });

type UserProps = {
  name: string;
  age: number;
  email: string;
  username : string;
  phonenumber: string;
  location: string;
  gender: string;
  bio: string;
  images?: string[];
  profilepics: string;
  socket: any;
  tags?: string[];
};

export const UserContext = createContext<{
  user: UserProps;
  setUser: React.Dispatch<React.SetStateAction<UserProps>>;
}>({
  user: {
    name: "",
    username : '',
    age: 0,
    email: "",
    phonenumber: "",
    location: "",
    gender: "",
    bio: "",
    images: [],
    profilepics: "",
    socket: null,
  },
  setUser: () => {},
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loaded, setloaded] = useState(true);

  const [user, setUser] = useState<UserProps>({
    name: "",
    age: 0,
    email: "",
    username : '',

    phonenumber: "",
    location: "",
    gender: "",
    bio: "",
    images: [],
    profilepics: "",
    socket: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:4000/alluser", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setUser({
            name: `${data.user.firstname} ${data.user.lastname}`,
            age: data.user.age,
            username : data.user.username,
            email: data.user.email,
            phonenumber: data.user.phonenumber,
            location: data.user.location,
            bio: data.user.bio,
            gender: data.user.gender,
            images: data.pics,
            profilepics: data.user.profileimg,
            socket: socket,
          });
          console.log("layout is ")
          console.log(data);
          setloaded(false);
          setIsAuthenticated(true);
          
        } catch (err) {
          console.error(err);
        }
        
      };
      fetchData();

      
    }
  }, [isAuthenticated]);

  return (
    <>
    {
      loaded ? (
        <Looad/>
      ) : (
            <UserContext.Provider value={{ user, setUser }}>
      <html lang="en">
        <body className={inter.className}>
          <Navbar isitauth={isAuthenticated}  set={setIsAuthenticated}/>
          {children}
          <Toaster />
        </body>
      </html>
    </UserContext.Provider>
      )
    }

    </>
  );
}
