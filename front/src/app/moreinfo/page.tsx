'use client'

import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

import { useRouter } from 'next/navigation';

import '../welcome/page.css';
import '../moreinfo/index.css';


const predefinedInterests = [
  'Humor', 'Fun', 'Study', 'Traveling', 'Gym', 'Movies', 'Music', 'Reading',
  'Cooking', 'Sports', 'Fitness', 'Yoga', 'Hiking', 'Gaming', 'Photography',
  'Art', 'Dancing', 'Theater', 'Volunteering', 'Pets', 'Nature', 'Meditation',
  'Technology', 'DIY Projects', 'Fashion', 'Shopping', 'Wine Tasting',
  'Craft Beer', 'Foodie', 'History', 'Science', 'Politics', 'Environmentalism',
  'Cars', 'Motorcycles', 'Beach', 'Mountains', 'Skiing', 'Snowboarding',
  'Running', 'Cycling', 'Swimming', 'Surfing', 'Camping', 'Astronomy',
  'Languages', 'Writing', 'Poetry', 'Anime', 'Comics', 'Board Games',
  'Card Games', 'Travel Planning', 'Architecture', 'Interior Design',
  'Collecting', 'Fishing', 'Bird Watching', 'Gardening', 'Martial Arts',
  'Self-Improvement', '+18', 'Other'
];

const InterestsComponent = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddInterest = () => {
    if (predefinedInterests.includes(inputValue) && !selectedInterests.includes(inputValue)) {
      setSelectedInterests([...selectedInterests, inputValue]);
      setInputValue('');
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`);
        },
        () => {
          fetch('https://api.ipify.org?format=json')
          .then(response => response.json())
          .then(data => {
            console.log('Your IP address is:', data.ip);
            return data.ip;  // Return the IP address for further use
          })
          .then(ip => {
            // Use the IP address to get the location
            return fetch(`https://ipapi.co/${ip}/json/`);
          })
          .then(response => response.json())
          .then(locationData => {
            const latitude = locationData.latitude;
            const longitude = locationData.longitude;

            // Format the location string
            const locationString = `Lat: ${latitude}, Lon: ${longitude}`;

            // Store the location using setLocation
            setLocation(locationString);
          })
          .catch(error => console.error('Error:', error));
          }
      );
    } else {
      setLocation('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/addtags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          tags: selectedInterests,
          phonenumber: phoneNumber,
          location : location,
        }),
      });

      if (response.ok) {
        alert('User preferences updated successfully');
        router.push('/upload_images');
        
      } else {
        throw new Error('Failed to update user preferences');
      }
    } catch (error) {
      alert(error);
      console.error('Error updating user preferences:', error);
    }
  };

  return (
    <div className="container mx-auto w-[90%] pr-64 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Interests</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="relative flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type an interest"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAddInterest}
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Interest
            </button>
            {inputValue && (
              <div className="absolute top-full left-0 mt-2 bg-white w-full max-h-44 border border-gray-300 rounded-md shadow-lg z-10 overflow-y-auto custom-scrollbar">
                {predefinedInterests
                  .filter((interest) =>
                    interest.toLowerCase().includes(inputValue.toLowerCase())
                  )
                  .map((interest, index) => (
                    <div
                      key={index}
                      className="p-2 cursor-pointer hover:bg-blue-100"
                      onClick={() => {
                        setInputValue(interest);
                        handleAddInterest();
                      }}
                    >
                      {interest}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-200 p-4 rounded-md mb-4">
          <h3 className="text-lg font-semibold mb-2">Selected Interests:</h3>
          <ul className="list-disc pl-5">
            {selectedInterests.map((interest, index) => (
              <li key={index} className="text-gray-700">
                {interest}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mt-4 flex flex-col items-center">
          <button
            type="button"
            onClick={handleLocationClick}
            className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Get Location
          </button>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Location:</h3>
            <p className="text-gray-700 mt-2">{location}</p>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};


interface BasicInfoProps {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

export function BasicInfo({ setIsSignUp }: BasicInfoProps) {
  const [age, setAge] = useState('');
  let [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  var OtherGender;

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
  };

  const handleSubmit = async () => {
    const ageNumber = Number(age);
    if (isNaN(ageNumber) || ageNumber < 16 || ageNumber > 75) {
      toast.error('Age must be between 16 and 75.');
      return;
    }
    if (bio.length > 250) {
      toast.error('Bio must be less than 250 characters.');
      return;
    }

    const token = localStorage.getItem('token');
    if (gender === 'male')
    {
      OtherGender = 'famle';
      gender = 'male'
    }
    else
      OtherGender = 'male'
    try {
      axios.post('http://localhost:4000/otherinfo', {
        age: age,
        gender: gender,
        bio: bio,
        token: token,
        OtherGender : OtherGender,
      });
      toast.success('Information submitted successfully.');
      setIsSignUp(true);
    } catch (error : any) {
      toast.error(error.response?.data || 'An error occurred.');
    }
  };

  return (
    <div className="container mx-auto w-[90%] pr-64 p-4">
    
      <div className="mb-4">
      <label className="text-lg font-semibold">Age:</label>
        <input
          type="number"
          value={age}
          onChange={handleAgeChange}
          placeholder="Age"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
      <label className="text-lg font-semibold">Gender</label>
        <select
          value={gender}
          onChange={handleGenderChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="mb-4 ">
        <label className="text-lg font-semibold">Bio:</label>
        <input
          type="text"
          value={bio}
          onChange={handleBioChange}
          placeholder="Bio"
          className=" p-2 border w-[50%] border-gray-300 rounded-md"
        />
      </div>
      <div>
        <button
          onClick={handleSubmit}
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
}


export default function  Moreinfo() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };




return (
	<div className='entering'>
    	<div className={`cont ${isSignUp ? 's--signup' : ''}`}>
        <BasicInfo setIsSignUp={setIsSignUp}/>
      		<div className="sub-cont">
        		<div className="img">
          			<div className="img__text m--up">
            			<h3>WE nned just some liitle info about you</h3>
        			</div>
          			<div className="img__text m--in">
        	   			<h3>We are very exited to be with us</h3>
          			</div>
       		 	</div>
      <InterestsComponent />
    		</div>
    	</div>
	</div>
  );
};