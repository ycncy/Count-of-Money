import React from 'react';
import { AdminCoins } from '../composant/Admin/AdminCoins';
import { AdminUsers } from '../composant/Admin/AdminUsers';

export function Admin() {
  return (
    <div className='bg-[#1F2937] min-h-screen'>
      <nav className='p-4 text-white border-b'>
        <div className='container mx-auto flex justify-between'>
          <div className='text-2xl font-bold'>Admin Dashboard</div>
          <div>
            <button className='ml-4 bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white'>
              Déconnexion
            </button>
          </div>
        </div>
      </nav>

      <div className='container mx-auto mt-4 p-4'>
        {/*<h1 className='text-3xl font-semibold'>*/}
        {/*    Tableau de bord d'administration*/}
        {/*</h1>*/}
        {/*<div className='bg-white rounded-lg shadow-lg mt-4 p-4'>*/}
        {/*    <h2 className='text-xl font-semibold'>Statistiques</h2>*/}
        {/*    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4'>*/}
        {/*        <div className='bg-blue-100 p-4 rounded-lg shadow-md'>*/}
        {/*            <h3 className='text-lg font-semibold'>Utilisateurs actifs</h3>*/}
        {/*            <p className='text-2xl mt-2'>256</p>*/}
        {/*        </div>*/}
        {/*        <div className='bg-green-100 p-4 rounded-lg shadow-md'>*/}
        {/*            <h3 className='text-lg font-semibold'>nombre article</h3>*/}
        {/*            <p className='text-2xl mt-2'>32</p>*/}
        {/*        </div>*/}
        {/*        <div className='bg-yellow-100 p-4 rounded-lg shadow-md'>*/}
        {/*            <h3 className='text-lg font-semibold'>Hausse spectacuaire</h3>*/}
        {/*            <p className='text-2xl mt-2'>512</p>*/}
        {/*        </div>*/}
        {/*        <div className='bg-red-100 p-4 rounded-lg shadow-md'>*/}
        {/*            <h3 className='text-lg font-semibold'>Problèmes signalés</h3>*/}
        {/*            <p className='text-2xl mt-2'>7</p>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</div>*/}
        <AdminUsers />
        <AdminCoins />
      </div>
    </div>
  );
}
