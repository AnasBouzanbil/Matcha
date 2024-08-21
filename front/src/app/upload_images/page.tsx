
'use client'











import './page.css';

import axios from 'axios';



import React, { useState } from 'react';

function Page() {
    const [images, setImages] = useState<string[]>([
        'http://digital-art-gallery.com/oid/0/1300x648_403_Knight_by_the_lake_2d_fantasy_knight_lake_warrior_picture_image_digital_art.jpg',
        'http://orig09.deviantart.net/2a38/f/2012/272/8/1/swamp_dragon_by_schur-d5g96rw.jpg',
        'http://img05.deviantart.net/d3d4/i/2013/109/d/6/cavalry_knights_by_artnothearts-d62b1vs.jpg',
        'http://img05.deviantart.net/d3d4/i/2013/109/d/6/cavalry_knights_by_artnothearts-d62b1vs.jpg',
        'http://img05.deviantart.net/d3d4/i/2013/109/d/6/cavalry_knights_by_artnothearts-d62b1vs.jpg',
    ]);

    const handleFileChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    const newImages = [...images];
                    newImages[index] = e.target.result as string;
                    setImages(newImages);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const Handle_Upload = async () => {
        const formData = new FormData();
        images.forEach((image, index) => {
            // Convert base64 to Blob
            fetch(image)
                .then(res => res.blob())
                .then(blob => {
                    formData.append(`image-${index}`, blob, `image-${index}.jpg`);
                })
                .finally(() => {
                    if (index === images.length - 1) {
                        // Upload the formData only after all images are added
                        axios.post('http://localhost:4000/upload', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        })
                        .then(() => {
                            alert('Image uploaded successfully!');
                        })
                        .catch(error => {
                            console.error('Error uploading the image:', error);
                            alert('Failed to upload image.');
                        });
                    }
                });
        });
    };
    

    return (
        <div className="row">
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
