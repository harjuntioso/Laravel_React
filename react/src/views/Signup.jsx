import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider'; 
export default function Signup() {
    
    const nameRef = useRef();
    const emailRef = useRef();
    // const phoneRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [errors, setErrors] = useState(null);

    const {setUser, setToken} = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            // phone: phoneRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: confirmPasswordRef.current.value
        }
        axiosClient.post('/signup', payload)
        .then(({data})=> {
            setUser(data.user);
            setToken(data.token);
        })
        .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                // Handle validation errors
                setErrors(response.data.errors);
            }
            //  else if (response && response.status === 401) {
            //     // Handle unauthorized error
            //     console.error("Unauthorized access", response.data.message);
            // } else {
            //     // Handle other errors
            //     console.error("An error occurred", err);
            // }
        })
    }
    
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Login to your account
                </h2>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <form onSubmit={onSubmit} className='space-y-6'>
                    {errors && <div className="alert ">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                        </div>}

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                        <div>
                            <input ref={nameRef} type="text" placeholder="Full Name" required className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'/>
                        </div>
                    </div>
                    
                    <div>
                         <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email Address</label>
                        <div>
                            <input ref={emailRef} type="email" placeholder="Email" required className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div>
                            <input ref={passwordRef} type="password" placeholder="Password" required className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                        <div>
                            <input ref={confirmPasswordRef} type="password" placeholder="Confirm Password" required className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'/>
                        </div>
                    </div>

                    <button className="btn btn-block w-full rounded-md bg-indigo-600 px-3 py-1.5 text-white text-base font-semibold hover:bg-indigo-500 focus:outline-2 focus:outline-indigo-600" type="submit">Sign Up</button>  
                    <p className='mt-10 text-center text-sm/6 text-gray-500'>
                        Already have an account? <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">Login</Link>
                    </p>  
                </form>
            </div>
        </div>
    );
}