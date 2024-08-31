// pages/login.js
'use client'
import { useEffect,useContext, useState } from 'react';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import socket from '../socket';
import { UserContext } from '../layout';
import './page.css';




export const Loginside = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { user, setUser } = useContext(UserContext); // Access the UserContext


    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/login', { username, password },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                const data = response.data;
                alert('Images uploaded successfully');
    
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
                localStorage.setItem("token", data.token);
                router.push('/profile');
            }
            else if(response.status === 409){
                toast.error('Invalid or expired token');
                router.push('/welcome');
              }
        } catch (error: any) {
            if (error.response.status === 400) {
                toast.error('Password incorrect');
            } else if (error.response.status === 404) {
                toast.error('User not found');
            } else {
                toast.error('An error occurred');
            }
        }
    };

    return (
        <div className="form sign-in">
                       <ToastContainer
                style={{ width: '300px', height: '10px' }}
            />
            <h2>Welcome</h2>
            <form onSubmit={handleLogin}>
                <label className="loginlabel">
                    <span>username</span>
                    <input 
                        type="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </label>
                <label className="relative loginlabel">
                    <span>Password</span>
                    <div className="flex flex-row items-center relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 end-0 left-[85%] justify-center flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none w-10 focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
                        >
                            <svg
                                className="shrink-0 size-3.5"
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path
                                    className="hs-password-active:hidden"
                                    d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                                ></path>
                                <path
                                    className="hs-password-active:hidden"
                                    d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                                ></path>
                                <path
                                    className="hs-password-active:hidden"
                                    d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                                ></path>
                                <line
                                    className="hs-password-active:hidden"
                                    x1="2"
                                    x2="22"
                                    y1="2"
                                    y2="22"
                                ></line>
                                <path
                                    className="hidden hs-password-active:block"
                                    d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                                ></path>
                                <circle
                                    className="hidden hs-password-active:block"
                                    cx="12"
                                    cy="12"
                                    r="3"
                                ></circle>
                            </svg>
                        </button>
                    </div>
                </label>
                <p className="forgot-pass">Forgot password?</p>
                <button type="submit" className="submit">Sign In</button>
            </form>
        </div>
    );
};

const SignupSide: React.FC = () => {
    const [emailInputFocused, setEmailInputFocused] = useState(false);
    const [emailConfirmed, setEmailConfirmed] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [emailCheck, setEmailCheck] = useState('');
    const [username, setUsername] = useState('');

    const [emailVerified, setEmailVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [validUsername, setValidUsername] = useState<boolean | null>(null);
    const [error, setError] = useState(null);
    const router = useRouter();
    useEffect(() => {
        socket.on('email-confirmed', () => {
            setEmailConfirmed(true);
            setEmailInputFocused(false);
        });
        console.log(localStorage.getItem('token'));

        socket.on('validateusername', (code) => {
            if (code === 200) {
                setValidUsername(true);
                toast.success('Username is available', {
                    position: "top-right",
                    autoClose: 4993,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: 1,
                    theme: "light",
                });
            } else if (code === 301) {
                setValidUsername(false);
                setEmailVerified(false);
            }
        });

        socket.on('emailverified', (status) => {
            if (status === 200) {
                toast.success('Email verified', {
                    position: "top-right",
                    autoClose: 4993,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: 1,
                    theme: "light",
                });
                setEmailInputFocused(false);
                setEmailConfirmed(false);

            } else {
                toast.error('Email not verified', {
                    position: "top-right",
                    autoClose: 4993,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: 1,
                    theme: "light",
                });
                setEmailVerified(false);
            }
        });

        return () => {
            socket.off('email-confirmed');
            socket.off('validateusername');
            socket.off('emailverified');
        };
    }, []);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        socket.emit('AvailableUsername', e.target.value);
    };

    const handleEmailCheck = () => {
        setEmailInputFocused(true);
        console.log(emailCheck);
        alert(emailCheck);
        socket.emit('emailcheck', emailCheck);
    };

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);

        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
        };
        console.log(data);
        axios.post('http://localhost:4000/user', data,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')

            }
        }
        )
            .then(response => {
                if (response.status === 200) {
                    alert('done');
                    localStorage.setItem('token', response.data);
                    router.push('/moreinfo');
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            })
            .finally(() => {
                setLoading(false);
                console.log('done');
            });
            console.log('done');
    };


    return (
        <form className="form sign-up" onSubmit={handleForm}>
            <h2>Create your Account</h2>
            <div className="flex flex-row">
                <label>
                    <span>First Name</span>
                    <input type="text" name="firstName" required />
                </label>
                <label>
                    <span>Last Name</span>
                    <input type="text" name="lastName" required />
                </label>
            </div>
            <div className="flex flex-row items-center">
                <label className="relative">
                    <span>Email</span>
                    <div className='flex flex-row justify-center '>
                        <input
                            type="email"
                            name="email"
                            onFocus={() => setEmailInputFocused(true)}
                            onBlur={() => setEmailInputFocused(false)}
                           onChange={(e) => setEmailCheck(e.target.value)}
                            value={emailCheck}
                            required
                        />
                        <button
                            className={`absolute left-[105%] top-0 checkemailbutton mt-3 w-[3rem] h-[3rem] bg-red-500 text-white p-2 rounded-full transition-opacity duration-300 ease-in-out ${
                                !emailConfirmed
                                    ? 'opacity-100'
                                    : 'opacity-0'
                            }`}
                            onClick={handleEmailCheck}
                            type="button"
                        >
                            ✓
                        </button>
                    </div>
                </label>
            </div>
            <label className="relative">
                <span>Password</span>
                <div className="flex flex-row items-center relative">
                    <input 
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        required
                    />
                    <button
                        onClick={() => setShowPassword(!showPassword)}
                        type="button"
                        className="absolute  inset-y-0 end-0 left-[85%] justify-center flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none w-10  focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
                    >
                        <svg
                            className="shrink-0 size-3.5"
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path
                                className="hs-password-active:hidden"
                                d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                            ></path>
                            <path
                                className="hs-password-active:hidden"
                                d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                            ></path>
                            <path
                                className="hs-password-active:hidden"
                                d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                            ></path>
                            <line
                                className="hs-password-active:hidden"
                                x1="2"
                                x2="22"
                                y1="2"
                                y2="22"
                            ></line>
                            <path
                                className="hidden hs-password-active:block"
                                d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                            ></path>
                            <circle
                                className="hidden hs-password-active:block"
                                cx="12"
                                cy="12"
                                r="3"
                            ></circle>
                        </svg>
                    </button>
                </div>
            </label>
            <label>
                <span>Username</span>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleOnChange}
                    required
                />
                {validUsername !== null && (
                    <span
                        className={`${
                            validUsername ? 'text-green-500' : 'text-red-500'
                        }`}
                    >
                        {validUsername ? 'Username is available' : 'Not valid'}
                    </span>
                )}
            </label>
            <button type="submit" className="submit mt-4" disabled={loading}>
                {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
        </form>
    );
};

const Login  = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };




return (
	<div className='entering'>
    	<div className={`cont ${isSignUp ? 's--signup' : ''}`}>
			<Loginside/>
      		<div className="sub-cont">
        		<div className="img">
          			<div className="img__text m--up">
        	   			<h3>Don't have an account? Please Sign up!</h3>
        			</div>
          			<div className="img__text m--in">
            			<h3>If you already have an account, just sign in.</h3>
          			</div>
          			<div className="img__btn" onClick={toggleSignUp}>
            			<span className="m--up">Sign Up</span>
            			<span className="m--in">Sign In</span>
          			</div>
       		 	</div>
					<SignupSide/>
    		</div>
    	</div>
	</div>
  );
};

export default Login;
