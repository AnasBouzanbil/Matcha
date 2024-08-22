'use client';

import './page.css';
import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function Page() {
    const [images, setImages] = useState<string[]>(['', '', '', '', '']);
    const [files, setFiles] = useState<File[]>([]);
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const router = useRouter();

    const handleFileChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
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

    const Handle_Upload = async () => {
    };

    return (
        <div className="row">
            <div className="small-12 large-4 columns">
                <div className="containers">
                    <div className="imageWrapper">
                        {profilePic ? (
                            <img className="image" src={URL.createObjectURL(profilePic)} alt="profile" />
                        ) : (
                            <div className="placeholder">No Profile Picture</div>
                        )}
                    </div>
                </div>
                <button className="file-upload">
                    <input
                        type="file"
                        className="file-input"
                        onChange={handleProfilePicChange}
                    />
                    Choose Profile Picture
                </button>
            </div>
            {images.map((image, index) => (
                <div key={index} className="small-12 large-4 columns">
                    <div className="containers">
                        <div className="imageWrapper">
                            <img className="image" src={image} alt={`image-${index}`} />
                        </div>
                    </div>
                    <button className="file-upload">
                        <input
                            type="file"
                            className="file-input"
                            onChange={handleFileChange(index)}
                        />
                        Choose File
                    </button>
                </div>
            ))}
            <div className="upload-container bg-slate-400">
                <button className="upload-button" onClick={Handle_Upload}>
                    Upload
                </button>
            </div>
        </div>
    );
}

export default Page;
