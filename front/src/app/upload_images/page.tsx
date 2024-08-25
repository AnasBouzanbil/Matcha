'use client';

import './page.css'; // Ensure this includes your Tailwind setup
import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function Page() {
    const [images, setImages] = useState<string[]>(['', '', '']);
    const [files, setFiles] = useState<File[]>([]);
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const router = useRouter();

    const handleFileChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (files.some((f) => f.name === file?.name)) {
            toast.error('File already uploaded');
            return;
        }
        if (files.some((f) => f.name === profilePic?.name)) {
            toast.error('File already uploaded');
            return;
        }
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    const newImages = [...images];
                    const newFiles = [...files];
                    newImages[index] = e.target.result as string;
                    newFiles[index] = file;
                    setImages(newImages);
                    setFiles(newFiles);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setProfilePic(file);
        }
    };

    const handleUpload = async () => {
        let token = localStorage.getItem('token') || '';
        try {

            if (profilePic) {
                const profilePicFormData = new FormData();
                profilePicFormData.append('file', profilePic);
                await axios.post('http://localhost:4000/profile', profilePicFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + token
                    }
                });

            }
            const formData = new FormData();
            // change the nam eof file to stary with the data currente 
            let filed ;
            files.forEach((file) => {
                filed = new File([file], Date.now() + '-' +  file.name);
                formData.append('file', filed);
            }
            );
            await axios.post('http://localhost:4000/upload_pictures', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'aurthorization': 'Bearer ' + token
                    }
                });
                alert('Images uploaded successfully');
                

                router.push('/profile');
            }
            catch (error) {
                alert('An error occurred ' + error);
                console.error(error);
            }
    };

    return (
        <div className="flex flex-col items-center p-4 space-y-4">
            {/* Profile Picture */}
            <div className="w-full max-w-md flex flex-col items-center">
                <div className="w-full flex justify-center mb-4">
                    {profilePic ? (
                        <img className="w-32 h-32 object-cover rounded-full border" src={URL.createObjectURL(profilePic)} alt="profile" />
                    ) : (
                        <div className="w-32 h-32 flex items-center justify-center border rounded-full bg-gray-200 text-gray-500">
                            No Profile Picture
                        </div>
                    )}
                </div>
                <label className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    <input
                        type="file"
                        className="hidden"
                        onChange={handleProfilePicChange}
                    />
                    Choose Profile Picture
                </label>
            </div>

            {/* Other Pictures */}
            <div className="w-full max-w-md grid grid-cols-2 gap-4">
                {images.map((image, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="w-32 h-32 flex justify-center items-center border rounded">
                            <img className="object-cover" src={image} alt={`image-${index}`} />
                        </div>
                        <label className="cursor-pointer mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleFileChange(index)}
                            />
                            Choose File
                        </label>
                    </div>
                ))}
            </div>
            <button
                className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={handleUpload}
            >
                Upload
            </button>
        </div>
    );
}

export default Page;
