import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Register() {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    baseCurrency: '',
    keyWords: [],
    provider: '',
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + 'auth/register',
        formData
      );
      console.log(response);
      localStorage.setItem('token', response.data.token);
      navigate('/');
      console.log('User registered successfully:', response.data);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Registration failed:', error.message);
      } else {
        console.error('An unexpected error occurred during registration.');
      }
    }
  };
  return (
    <section className='bg-gradient-to-r from-violet-500 to-fuchsia-900'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Create an account
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor='username'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Username
                </label>
                <input
                  type='text'
                  name='username'
                  id='username'
                  value={formData.username}
                  onChange={handleChange}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='username'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Your email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='name@company.com'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  id='password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor='baseCurrency'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Base Currency
                </label>
                <input
                  type='text'
                  name='baseCurrency'
                  id='baseCurrency'
                  value={formData.baseCurrency}
                  onChange={handleChange}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Base Currency'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='provider'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Provider
                </label>
                <input
                  type='text'
                  name='provider'
                  id='provider'
                  value={formData.provider}
                  onChange={handleChange}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Provider'
                  required
                />
              </div>
              <button
                type='submit'
                className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                Create an account
              </button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Already have an account?
                <Link
                  to='/login'
                  className='text-white hover:text-gray-300 mx-4'
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
