// pages/index.tsx

'use client'

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const Profile = () => {
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        alert(token)
        console.log(token)
        toast.success(token)
        const response = await axios.post('http://localhost:4000/GetUser', { token });
        toast('here we ho im done');
        console.log(response);
        setProfileData(response.data);
      } catch (error) {
        toast.error('Error fetching profile data ' + error); 
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Profile Information</h1>
      {profileData ? (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg text-gray-900">
          <h2 className="text-3xl font-bold mb-4">Profile Details</h2>
          <p><strong>Name: </strong> {profileData.firstname } {profileData.lastname}  </p>
          <p><strong>Age:</strong> {profileData.age}</p>
          <p><strong>Gender:</strong> {profileData.gender}</p>
          <p><strong>Sexual Preferences:</strong> {profileData.gender_preference}</p>
          <p><strong>Biography:</strong> {profileData.bio}</p>
          <p><strong>Interests:</strong> {profileData.interests && profileData.interests.join(', ')}</p>
        </div>
      ) : (
        <p>Loading profile data...</p>
      )}
    </main>
  );
};

export default Profile;
