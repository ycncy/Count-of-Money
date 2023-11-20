// NavBar.tsx

import React from 'react';

interface NavBarConnectedUserProps {
  username: string;
}

const NavBarConnectedUser: React.FC<NavBarConnectedUserProps> = ({
  username,
}) => {
  return (
    <nav className='bg-gray-800 p-4'>
      <div className='flex items-center'>
        <img
          src='../img/logo.png'
          alt='Logo'
          className='h-8 w-auto'
          style={{ width: '200px', height: '100px', borderRadius: '10%' }}
        />
      </div>
      <span className='text-white text-lg ml-2'>
        Less reflexion more investimant{' '}
      </span>

      <div className='flex-grow text-center'>
        <input
          type='text'
          placeholder='Search...'
          className='bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none'
        />
      </div>

      <div className='flex items-center ml-auto'>
        <a href='#' className='text-white hover:text-gray-300 mx-4'>
          Profile
        </a>
        <a href='#' className='text-white hover:text-gray-300 mx-4'>
          Articles
        </a>
        <a href='#' className='text-white hover:text-gray-300 mx-4'>
          Logout
        </a>
      </div>
    </nav>
  );
};

export default NavBarConnectedUser;
