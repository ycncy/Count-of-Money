import React from 'react';
import { AdminCoins } from '../composant/Admin/AdminCoins';
import { AdminUsers } from '../composant/Admin/AdminUsers';
import {NavBarConnectedUser} from "../composant/Navbar/NavBarConnectedUser";

export function Admin() {
  return (
    <div className='bg-[#171B26] min-h-screen'>
        <NavBarConnectedUser/>
      <div className='container mx-auto mt-4 p-4'>
        <AdminUsers />
        <AdminCoins />
      </div>
    </div>
  );
}
