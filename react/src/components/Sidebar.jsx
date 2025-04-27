import React from 'react';

const Sidebar = () => {
    return (
        <div className="side-navbar">
            <ul>
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/users">Users</a></li>
                <li><a href="/settings">Settings</a></li>
            </ul>
        </div>
    );  
}   

export default Sidebar;
