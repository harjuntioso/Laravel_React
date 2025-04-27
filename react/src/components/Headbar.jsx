import React from 'react';
import { Link } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import axiosClient from '../axios-client';
import { useEffect } from 'react';
import { useState } from 'react';
import {FaMoon, FaSun } from 'react-icons/fa';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { MdSpaceDashboard } from 'react-icons/md';


const Headbar = ({darkMode, toggleDarkMode}) => {

    const {user, token, setUser, setToken} = useStateContext();

    const onLogout = (ev) => {

        ev.preventDefault();
        // Perform logout request
        axiosClient.post('/logout')
        .then(() => {
            setUser({});
            setToken(null);
        })
    }

    return (
        <nav className='fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
           <div className='px-3 py-3 lg:px-5 lg:pl-3'>
            <div className='flex items-center justify-center'>
                <div className='flex items-center justify-start rtl:justify-end w-full'> 
                   <button className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600' >
                       <HiOutlineMenuAlt2 className='w-6 h-6' /> 
                   </button>
                   <a href='/' className='flex ms-2 md:me-24'>
                   <MdSpaceDashboard className='h-8 me-3 text-xl text-violet-500' />
                   <span className='self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white'>
                    Dashboard</span>
                   </a>

                </div>
                <span className="flex items-center justify-end text-xl font-semibold sm:text-lg whitespace-nowrap dark:text-white">
                       <a  href="#" onClick={onLogout}>Logout</a>
                   </span>
                    
            </div>
           </div>
        </nav>
    );
}

export default Headbar;
