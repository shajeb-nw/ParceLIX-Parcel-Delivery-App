import React from 'react';
import logo from '../assets/logo.png'
const Logo = () => {
    return (
        <div className='flex items-center justify-center gap-1.5'>
            <img src={logo} alt="logo icon" width={40}/>
            <div className='text-3xl font-semibold  text-color'>ParceLIX</div>
        </div>
    );
};

export default Logo;