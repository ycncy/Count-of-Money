import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {authenticationService} from "../../services/authentication/authentication.service";
import { Profile } from '../../types';

interface NavBarProps {
  user?: Profile;
}

export function NavBarConnectedUser({user}: NavBarProps)  {
    const navigate = useNavigate();

    const logout = async () => {
        await authenticationService.logout();
        navigate('/homepage');
        window.location.reload();
    }

    return (
        <nav className='bg-[#171B26] p-4 flex justify-around items-center border-b'>
            <Link className='flex items-center' to='/homepage'>
                <img
                    src='../img/logo.png'
                    alt='Logo'
                    className='h-10 w-auto'
                />
            </Link>
            <span className='text-white text-lg ml-4'>
        Less reflexion more investment{' '}
      </span>
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
         <Link to='/' className='text-white hover:text-gray-300 mx-4'
         onClick={logout}>
          Logout
        </Link>

      </div>
    </nav>
  );
}
