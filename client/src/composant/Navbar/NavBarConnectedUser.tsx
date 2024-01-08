// NavBar.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Profile } from '../../types';

interface NavBarProps {
  user?: Profile;
}

export function NavBarConnectedUser({ user }: NavBarProps) {
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
        Less reflexion more investment{' '}
      </span>

      <div className='flex-grow text-center'></div>

      <div className='flex items-center ml-auto'>
        <Link to='/profile' className='text-white hover:text-gray-300 mx-4'>
          Profile
        </Link>

        <Link to='/articles' className='text-white hover:text-gray-300 mx-4'>
          Article
        </Link>

        {user?.role === 'ADMIN' && (
          <>
            <Link
              to='/admin'
              className='text-white hover:text-gray-300 mx-4'
              >
              Admin
              </Link>
            <Link
            to='/coins'
            className='text-white hover:text-gray-300 mx-4'
            >
              Coins
              </Link>
              <Link
              to='/localCoins'
              className='text-white hover:text-gray-300 mx-4'
              >
              Local Coins
              </Link>
            </>
        )}
         <Link to='/' className='text-white hover:text-gray-300 mx-4'>
          Logout
        </Link>

      </div>
    </nav>
  );
}
