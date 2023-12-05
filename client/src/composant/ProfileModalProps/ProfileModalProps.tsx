// ProfileModal.js
import React, { useState } from 'react';

// Define prop types explicitly
type ProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: { name: string; email: string; password: string, baseCurrency:string }) => void;
};

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [baseCurrency, setBaseCurrency] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleBaseCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBaseCurrency(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ name, email, password , baseCurrency});
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'}`}>
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50 flex items-center justify-center"> 
        <div className="modal-content bg-white w-96 p-4 rounded-md shadow-md">
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-600">
              Name:
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </label>

            <label className="block text-sm font-medium text-gray-600">
              Email:
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </label>

            <label className="block text-sm font-medium text-gray-600">
              Password:
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </label>

            <label className="block text-sm font-medium text-gray-600">
      Base Currency:
      <select
        value="USD"
        className="mt-1 p-2 w-full border rounded-md"
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
      </select>
    </label>
  
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Modifier le profil
            </button>
            <button
              onClick={onClose}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Annuler
            </button>
          </form>
        </div>
        </div>
    </div>
  );
};

export default ProfileModal;
