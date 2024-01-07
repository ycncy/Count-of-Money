import React, { useState,useEffect } from 'react';
import { getProfile, updateProfile } from  '../../services/users/public/public.users.service';

type ProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: { username: string; email: string; password: string, baseCurrency:string }) => void;
};

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    baseCurrency: '',
    }) ;

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const user = await getProfile();
          setUserData(user);
        } catch (error) {
          console.error('Error fetching user data', error);
        }
      };
      fetchUserData();
    }, []);
  
    const handleNameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      setUserData((prevUser) => ({ ...prevUser, username: event.target.value }));
    };
  
    const handleEmailChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      setUserData((prevUser) => ({ ...prevUser, email: event.target.value }));
    };
  
    const handlePasswordChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      setUserData((prevUser) => ({ ...prevUser, password: event.target.value }));
    };
     const handleBaseCurrencyChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
      setUserData((prevUser) => ({ ...prevUser, baseCurrency: event.target.value }));
    }
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(userData);
  };

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'}`}>      
    <div className="bg-black opacity-50 absolute w-full h-full"></div>
    <div className="modal-overlay absolute w-full h-full flex items-center justify-center">
      <div className="modal-content bg-white w-96 p-4 rounded-md shadow-md">
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-600">
              Username:
              <input
                type="text"
                value={userData.username || ''}
                onChange={handleNameChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </label>

            <label className="block text-sm font-medium text-gray-600">
              Email:
              <input
                type="email"
                value={userData.email || ''}
                onChange={handleEmailChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </label>

            <label className="block text-sm font-medium text-gray-600">
              Password:
              <input
                type="password"
                value={userData.password || ''}
                onChange={handlePasswordChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </label>

            <label className="block text-sm font-medium text-gray-600">
      Base Currency:
      <select
        className="mt-1 p-2 w-full border rounded-md"
       onChange={handleBaseCurrencyChange} >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
      </select>
    </label>
        <div className="mt-4 flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
              Modifier le profile
            </button>
            <button
              onClick={onClose}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 ml-3"
              >
              Annuler
            </button>
            </div>
          </form>
        </div>
        </div>
    </div>
  );
};

export default ProfileModal;
