// NavBar.tsx

import React from 'react';
import { Link } from 'react-router-dom';

interface NavBarConnectedUserProps {
  search: string;
  setSerach: (value: string) => void;
}

const NavBarConnectedUser: React.FC<NavBarConnectedUserProps> = ({
  search,
  setSerach,
}) => {
  const [text, setText] = React.useState('');
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

      <div className='flex-grow text-center'>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type='text'
          placeholder='Search...'
          className='bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none'
        />
        <button
          onClick={() => {
            console.log(text);
            setSerach(text);
          }}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
        >
          Chercher
        </button>
      </div>

      <div className='flex items-center ml-auto'>
        <Link to='/Profile' className='text-white hover:text-gray-300 mx-4'>
          Profile
        </Link>

        <Link to='/Article' className='text-white hover:text-gray-300 mx-4'>
          Article
        </Link>

        <Link to='/' className='text-white hover:text-gray-300 mx-4'>
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default NavBarConnectedUser;
