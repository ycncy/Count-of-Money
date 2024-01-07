import React, {useEffect} from 'react';
import {AdminCoins} from '../composant/Admin/AdminCoins';
import {AdminUsers} from '../composant/Admin/AdminUsers';
import {NavBarConnectedUser} from "../composant/Navbar/NavBarConnectedUser";
import cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

export function Admin() {

    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = cookies.get('access_token');

        if (accessToken) {
            const decodedToken = jwtDecode(accessToken) as { role: string };
            if (decodedToken.role !== 'ADMIN') {
                navigate('/homepage');
            }
        }
    }, []);

    return (
        <div className='bg-[#171B26] min-h-screen'>
            <NavBarConnectedUser/>
            <div className='container mx-auto mt-4 p-4'>
                <AdminUsers/>
                <AdminCoins/>
            </div>
        </div>
    );
}
