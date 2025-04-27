import React from 'react';
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div  className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    404 - Page Not Found
                </h2>
            </div>
            
            <div className="alert alert-danger mt-10 text-center"> 
            Likely You Have Lost Your Way My Friend. Lets Return to the 
            Home Page.
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full'>
            <Link to="/">
                <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="button">
                    Home
                </button>
            </Link>
            </div>
        </div>
    );
}