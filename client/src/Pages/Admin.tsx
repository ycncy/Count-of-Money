import React from 'react';
import { useQuery } from 'react-query';
import { getMe } from '../api/user';
import { getAllCoins } from '../api/public';
import { log } from 'console';

function Admin() {
  const { data: user } = useQuery('me', getMe, {
    retry: (_, error: any) => !(error.response?.status === 404),
    enabled: localStorage.getItem('token') !== null,
  });

  const { data: coins } = useQuery(['Coins'], () => getAllCoins(), {
    enabled: !!user,
  });
  console.log(coins);
  return (
    <div className='bg-gray-100 min-h-screen'>
      {/* Barre de navigation */}
      <nav className='bg-blue-500 p-4 text-white'>
        <div className='container mx-auto flex justify-between'>
          <div className='text-2xl font-bold'>Admin Dashboard</div>
          <div>
            <a href='#' className='ml-4'>
              Tableau de bord
            </a>
            <a href='#' className='ml-4'>
              Utilisateurs
            </a>
            <a href='#' className='ml-4'>
              Paramètres
            </a>
            <button className='ml-4 bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white'>
              Déconnexion
            </button>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <div className='container mx-auto mt-4 p-4'>
        <h1 className='text-3xl font-semibold'>
          Tableau de bord d'administration
        </h1>

        {/* Contenu du tableau de bord */}
        <div className='bg-white rounded-lg shadow-lg mt-4 p-4'>
          <h2 className='text-xl font-semibold'>Statistiques</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4'>
            <div className='bg-blue-100 p-4 rounded-lg shadow-md'>
              <h3 className='text-lg font-semibold'>Utilisateurs actifs</h3>
              <p className='text-2xl mt-2'>256</p>
            </div>
            <div className='bg-green-100 p-4 rounded-lg shadow-md'>
              <h3 className='text-lg font-semibold'>nombre article</h3>
              <p className='text-2xl mt-2'>32</p>
            </div>
            <div className='bg-yellow-100 p-4 rounded-lg shadow-md'>
              <h3 className='text-lg font-semibold'>Hausse spectacuaire</h3>
              <p className='text-2xl mt-2'>512</p>
            </div>
            <div className='bg-red-100 p-4 rounded-lg shadow-md'>
              <h3 className='text-lg font-semibold'>Problèmes signalés</h3>
              <p className='text-2xl mt-2'>7</p>
            </div>
          </div>
        </div>

        {/* Liste des utilisateurs */}
        <div className='bg-white rounded-lg shadow-lg mt-4 p-4'>
          <h2 className='text-xl font-semibold'>Liste des utilisateurs</h2>
          <table className='w-full mt-4'>
            <thead>
              <tr>
                <th className='text-left'>Nom</th>
                <th className='text-left'>Email</th>
                <th className='text-left'>Rôle</th>
                <th className='text-left'>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>john@example.com</td>
                <td>Administrateur</td>
                <td>
                  <button className='text-blue-500 hover:underline'>
                    Modifier
                  </button>
                  <button className='text-red-500 ml-2 hover:underline'>
                    Supprimer
                  </button>
                </td>
              </tr>
              <tr>
                <td>Jane Smith</td>
                <td>jane@example.com</td>
                <td>Utilisateur</td>
                <td>
                  <button className='text-blue-500 hover:underline'>
                    Modifier
                  </button>
                  <button className='text-red-500 ml-2 hover:underline'>
                    Supprimer
                  </button>
                </td>
              </tr>
              {/* Ajoutez plus d'utilisateurs ici */}
            </tbody>
          </table>
        </div>
        <div className='bg-white rounded-lg shadow-lg mt-4 p-4'>
          <h2 className='text-xl font-semibold'>Liste Coins</h2>
          <table className='w-full mt-4'>
            <thead>
              <tr>
                <th className='text-left'>Id</th>
                <th className='text-left'>Nom</th>
                <th className='text-left'>Symbole</th>
                <th className='text-left'>Niveau</th>
              </tr>
            </thead>
            <tbody>
              {/* {coins?.map((coin) => (
                <tr>
                  <td>{coin.id}</td>
                  <td>{coin.name}</td>
                  <td>{coin.symbol}</td>
                  <td>{coin.rank}</td>
                </tr>
              ))} */}
              {/* Ajoutez plus d'utilisateurs ici */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
