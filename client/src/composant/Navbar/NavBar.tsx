import React from 'react';
import { Link } from 'react-router-dom';

export function NavBar() {
  return (
    <nav className='bg-gray-800 p-4'>
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

      <div className='flex-grow text-center'>
        <Link to='/login' className='text-white hover:text-gray-300 mx-4'>
          Login
        </Link>

        <span className='text-white'>|</span>
        <Link to='/register' className='text-white hover:text-gray-300 mx-4'>
          Register
        </Link>
      </div>
    </nav>
  );
}
