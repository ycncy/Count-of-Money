import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {authenticationService} from "../../services/authentication/authentication.service";
import cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';

export function NavBarConnectedUser() {
    const [userRole, setUserRole] = React.useState<string>('');

    const logout = async () => {
        await authenticationService.logout();
        window.location.reload();
    }

    useEffect(() => {
        const accessToken = cookies.get('access_token');

        if (accessToken) {
            const decodedToken = jwtDecode(accessToken) as {role: string};
            setUserRole(decodedToken.role);
        }
    }, []);


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

                {userRole === 'ADMIN' && (
                    <Link to='/admin' className='text-white hover:text-gray-300 mx-4'>
                        Admin Dashboard
                    </Link>
                )}

                <button onClick={logout} className='text-white hover:text-gray-300 mx-4'>
                    Logout
                </button>
            </div>
        </nav>
    );
}
