import React from 'react';
import { Link } from "react-router-dom";
import { useRef } from 'react';
import { useStateContext } from "../context/ContextProvider";
import axiosClient from '../axios-client';

export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const {setUser, setToken} = useStateContext();
    const [errors, setErrors] = React.useState(null);

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }


        axiosClient.post('/login', payload)
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
                         <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email Address</label>
                        <div>
                            <input ref={emailRef} type="email" placeholder="Email" required className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'/>
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div>
                        <input ref={passwordRef} type="password" placeholder="Password" required  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'/>
                        </div>
                    </div>

                    <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit">Login</button>  
                   
                    <p className='mt-10 text-center text-sm/6 text-gray-500'>
                        Don't have an account? <Link to="/signup" className='font-semibold text-indigo-600 hover:text-indigo-500">Start a 14 day free trial'>Sign up</Link>
                    </p>  
                </form>
            </div>
        </div>
    );
}