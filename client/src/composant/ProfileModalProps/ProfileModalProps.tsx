// ProfileModal.js
import React, { useState } from 'react';

// Define prop types explicitly
type ProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: { name: string; email: string; password: string }) => void;
};

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ name, email, password });
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'}`}>
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50">   <div className="modal-content bg-white w-96 p-4 rounded-md shadow-md">
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

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Update Profile
            </button>
          </form>
        </div>mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm</div>
      <div className="modal-container fixed w-full h-full flex items-center justify-center">
     
      </div>
    </div>
  );
};

export default ProfileModal;
