'use client'

import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
    const [selectedFile, setSelectedFile] = useState(null) as any;

    const handleFileChange = (event : any) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            await axios.post('http://localhost:4000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading the image:', error);
            alert('Failed to upload image.');
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button className='bg-slate-400' onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default ImageUpload;
