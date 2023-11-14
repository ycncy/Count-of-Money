// Profil.tsx

import React from 'react';

const Profil: React.FC = () => {
  return (
    <div className='bg-gray-100 min-h-screen flex items-center justify-center'>
      <div className='bg-white p-8 rounded shadow-md w-96'>
        <img
          src='path/to/your/profile-image.jpg' // Remplacez par le chemin réel de votre image de profil
          alt='Profile'
          className='w-32 h-32 rounded-full mx-auto mb-4'
        />
        <h2 className='text-xl font-bold text-center mb-4'>
          Nom d'utilisateur
        </h2>
        <p className='text-gray-700 text-center mb-4'>
          Bio de l'utilisateur...
        </p>

        {/* Informations additionnelles du profil */}
        <div className='mb-4'>
          <strong>Email:</strong> user@example.com
        </div>

        <div className='mb-4'>
          <strong>Ville:</strong> Villeville
        </div>

        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Modifier le profil
        </button>
      </div>
    </div>
  );
};

export default Profil;
