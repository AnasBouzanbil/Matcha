'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar } from '../Navbar';
import './page.css';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const ImageUpload: React.FC = () => {
    const router = useRouter();
    const [images, setImages] = useState<string[]>([
        'https://cdn.intra.42.fr/users/6f3635a1ce78336ded0d21b4fbe7e7af/abouzanb.jpg',
        'https://cdn.intra.42.fr/users/6f3635a1ce78336ded0d21b4fbe7e7af/abouzanb.jpg',
        'https://cdn.intra.42.fr/users/6f3635a1ce78336ded0d21b4fbe7e7af/abouzanb.jpg',
        'https://cdn.intra.42.fr/users/6f3635a1ce78336ded0d21b4fbe7e7af/abouzanb.jpg',
        'https://cdn.intra.42.fr/users/6f3635a1ce78336ded0d21b4fbe7e7af/abouzanb.jpg'
    ]);
    const [name, setName] = useState<string>('Anas Bouzanbil');
    const [bio, setBio] = useState<string>('This is a default bio.');
    const [tags, setTags] = useState<string[]>([]);
    const [profilePicUrl, setProfilePicUrl] = useState<string>('https://cdn.intra.42.fr/users/6f3635a1ce78336ded0d21b4fbe7e7af/abouzanb.jpg');
    const [loading, setLoading] = useState<boolean>(true);
    const [followers, setFollowers] = useState<number>(0);
    const [following, setFollowing] = useState<number>(0);
    const [selectedTab, setSelectedTab] = useState<string>('post');

    useEffect(() => {
        const fetchImages = async () => {
            const path = 'http://localhost:4000/uploads/'
            try {
                const response = await axios.get('http://localhost:4000/alluser', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.status === 409) {
                    toast.error('Invalid token');
                    router.push('/login');
                }
                setImages(response.data.pics);
                setProfilePicUrl(path+response.data.user.profileimg || profilePicUrl);
                setName(response.data.user.firstname + response.data.user.lastname);
                setBio(response.data.user.bio || bio);
                setTags(response.data.tags || tags);
                setFollowers(response.data.followers || followers);
                setFollowing(response.data.following || following);
                console.log(images)
                
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchImages();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleTabClick = (tab: string) => {
        setSelectedTab(tab);
    };

    const renderContent = () => {
        switch (selectedTab) {
            case 'post':
                return (
                    <div className="flex flex-wrap -mx-px md:-mx-3">
                        {images.map((image, index) => (
                            <div key={index} className="w-1/3 p-px md:px-3">
                                <a href="#">
                                    <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
                                        <img className="w-full h-full absolute left-0 top-0 object-cover" src={ 'http://localhost:4000/uploads/' + image} alt="image" />
                                        <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden">
                                            <div className="flex justify-center items-center space-x-4 h-full">
                                                <span className="p-2">
                                                    <i className="fas fa-heart"></i> 412K
                                                </span>
                                                <span className="p-2">
                                                    <i className="fas fa-comment"></i> 2,909
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                </a>
                            </div>
                        ))}
                    </div>
                );
            case 'igtv':
                return <div className="p-5 text-center">This is a random text when IGTV is clicked.</div>;
            case 'tagged':
                return (
                    <div className="p-5 text-center">
                        {tags.length > 0 ? tags.map((tag, index) => <div key={index} className="tag">{tag}</div>) : "No tags available"}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <main className="bg-gray-100 bg-opacity-25">
            <div className="lg:w-8/12 lg:mx-auto mb-8 mt-20">
                <header className="flex flex-wrap items-center p-4 md:py-8">
                    <div className="md:w-3/12 md:ml-16">
                        <img className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full border-2 border-pink-600 p-1" src={profilePicUrl} alt="profile" />
                    </div>
                    <div className="w-8/12 md:w-7/12 ml-4">
                        <div className="md:flex md:flex-wrap md:items-center mb-4">
                            <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">{name}</h2>
                            <span className="inline-block fas fa-certificate fa-lg text-blue-500 relative mr-6 text-xl transform -translate-y-2" aria-hidden="true">
                                <i className="fas fa-check text-white text-xs absolute inset-x-0 ml-1 mt-px"></i>
                            </span>
                            <a href="#" className="bg-blue-500 px-2 py-1 text-white font-semibold text-sm rounded block text-center sm:inline-block">Follow</a>
                        </div>
                        <ul className="hidden md:flex space-x-8 mb-4">
                            <li><span className="font-semibold">136</span> posts</li>
                            <li><span className="font-semibold">{followers}</span> followers</li>
                            <li><span className="font-semibold">{following}</span> following</li>
                        </ul>

                        <div className="hidden md:block">
                            <h1 className="font-semibold">{name}</h1>
                            <span>{bio}</span>
                        </div>
                    </div>
                    <div className="md:hidden text-sm my-2">
                        <h1 className="font-semibold">{name}</h1>
                        <span>{bio}</span>
                    </div>
                </header>
                <div className="px-px md:px-3">
                    <ul className="flex items-center justify-around md:justify-center space-x-12 uppercase tracking-widest font-semibold text-xs text-gray-600 border-t">
                        <li className={`md:border-t md:border-gray-700 md:-mt-px ${selectedTab === 'post' ? 'text-gray-700' : ''}`}>
                            <a className="inline-block p-3" href="#" onClick={() => handleTabClick('post')}>
                                <i className="fas fa-th-large text-xl md:text-xs"></i>
                                <span className="hidden md:inline">post</span>
                            </a>
                        </li>
                        <li className={`${selectedTab === 'igtv' ? 'text-gray-700' : ''}`}>
                            <a className="inline-block p-3" href="#" onClick={() => handleTabClick('igtv')}>
                                <i className="far fa-square text-xl md:text-xs"></i>
                                <span className="hidden md:inline">IGTV</span>
                            </a>
                        </li>
                        <li className={`${selectedTab === 'tagged' ? 'text-gray-700' : ''}`}>
                            <a className="inline-block p-3" href="#" onClick={() => handleTabClick('tagged')}>
                                <i className="fas fa-user border border-gray-500 px-1 pt-1 rounded text-xl md:text-xs"></i>
                                <span className="hidden md:inline">tagged</span>
                            </a>
                        </li>
                    </ul>
                    <div className="flex flex-wrap -mx-px md:-mx-3">
                        {images.map((image, index) => (
                            <div key={index} className="w-1/3 p-px md:px-3">
                                <a href="#">
                                    <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
                                        <img className="w-full h-full absolute left-0 top-0 object-cover" src={ 'http://localhost:4000/uploads/' + image} alt="image" />
                                        <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden">
                                            <div className="flex justify-center items-center space-x-4 h-full">
                                                <span className="p-2">
                                                    <i className="fas fa-heart"></i> 412K
                                                </span>
                                                <span className="p-2">
                                                    <i className="fas fa-comment"></i> 2,909
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ImageUpload;