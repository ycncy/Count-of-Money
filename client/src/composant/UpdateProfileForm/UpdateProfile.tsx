
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UpdateProfile = () => {
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
    // TODO: Handle form submission
  };

  return (
    <div className="flex items-center justify-center h-screen">
    <div className="max-w-xl w-full mx-auto bg-white p-10 rounded-md shadow-md">
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
      Update Profile
    </button>
  

  </form>
  </div>

  </div>
  
  );
};

export default UpdateProfile;
