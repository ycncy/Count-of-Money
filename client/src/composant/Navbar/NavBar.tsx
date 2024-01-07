import React from 'react';
import { Link } from 'react-router-dom';

export function NavBar() {
  return (
    <nav className='bg-[#171B26] p-4 flex justify-between items-center border-b'>
        <Link className='flex items-center' to='/homepage'>
            <img
                src='../img/logo.png'
                alt='Logo'
                className='h-10 w-auto'
            />
            <span className='text-white text-lg ml-4'>
        Less reflexion more investment{' '}
      </span>
        </Link>

      <div className='flex text-center'>
        <Link to='/login' className='text-white hover:text-gray-300 mx-4'>
          Login
        </Link>
        <Link to='/register' className='text-white hover:text-gray-300 mx-4'>
          Register
        </Link>
      </div>
    </nav>
  );
}
