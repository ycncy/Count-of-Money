import React from 'react';
const NavBar: React.FC = () => {
  return (
    <nav className='bg-gray-800 p-4'>
      {/* Logo Section (Left) */}
      <div className='flex items-center mt-15'>
        <img
          src='../img/logo.png'
          alt='Logo'
          className='h-8 w-auto'
          style={{ width: '200px', height: '100px', borderRadius: '10%' }}
        />
      </div>
      <span className='text-white text-lg ml-2'>
        Less reflexion more investimant
      </span>

      {/* Login/Register Section (Center) */}
      <div className='flex-grow text-center'>
        <a href='#' className='text-white hover:text-gray-300 mx-4'>
          Login
        </a>
        <span className='text-white'>|</span>
        <a href='#' className='text-white hover:text-gray-300 mx-4'>
          Register
        </a>
      </div>

      {/* Search Bar Section (Center) */}
      <div className='flex-grow text-center'>
        <input
          type='text'
          placeholder='Search...'
          className='bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none'
        />
      </div>
    </nav>
  );
};

export default NavBar;
