'use client';

import React from "react";
import axios from "axios";
import socket from '../../socket';
import { useEffect, useState } from "react";
import  remote  from 'electron';


const ConfirmEmail: React.FC = () => {
    const [router, setRouter] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setRouter(window.location.href);
        }
    }, []);

    const handleConfirm = async () => {
        if (router) {
            const token_mail = router.split('/')[4];
            const token = token_mail.split('?')[0];
            const email = token_mail.split('?')[1];
            console.log(token);
            console.log(email);
           await  axios.post('http://localhost:4000/confirmemail', 
            {
                token: token
            })
            .then((res) => {
                console.log(res);
                if (res.status == 200)
                    socket.emit('emailverifieddone', token);
                else 
                    alert('Invalid token');
                window.open('', '_self', ''); window.close();

            })
            .catch((err) => {
                console.log(err);
            });
        }

    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Confirm Email</h1>
            <h2 className="text-lg text-gray-700 mb-6">Press the button to confirm the email address</h2>
            <button 
                onClick={handleConfirm}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-200"
            >
                Confirm
            </button>
        </div>
    );
};

export default ConfirmEmail;
