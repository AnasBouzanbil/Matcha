'use client'
import React, { useEffect } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import logo from '/nfs/homes/abouzanb/Screenshots/matching.png';
import Image from 'next/image';


export default function Navbar() {
    const [showLogin, setShowLogin] = React.useState(true);
    const [showpremuium, setShowpremuium] = React.useState(true);
    const router = useRouter();



    useEffect(() => {
        if (localStorage.getItem('id')) {
            setShowLogin(false);
        }
    }
    , []);


    return (
        <nav className="navbar">
            <div className="flex-1 flex ">
                <a href="/">
                    <Image src={logo} alt="logo" width={60} height={60} className="logo" />
                </a>ext.jpg
            </div>
    
            <div className="buttons">
                <button onClick={() => router.push('/welcome')} className="signing">Join Us</button>
            </div>
        </nav>
    );
 }    