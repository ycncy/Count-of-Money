import React, { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { authenticationService } from '../services/authentication/authentication.service';
import { LoginDto } from '../services/authentication/authentication.interfaces';

export function Login() {
  const [errorMessage, setErrorMessage] = React.useState('');
  let navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: FormData = new FormData(event.currentTarget);
    const form: LoginDto = {
      login: formData.get('login') as string,
      password: formData.get('password') as string,
    };
    const data = await authenticationService.login(form);
    if (data.status === parseInt('401')) {
      setErrorMessage(data.response);
    } else {
      if (data.status === parseInt('404')) {
        console.log('User not found');
      } else {
        localStorage.setItem('token', data.token);
        navigate('/homepage');
      }
    }
  };
  return (
    <section className=''>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto '>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Login to your account
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor='login'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Username or Email
                </label>
                <input
                  type='text'
                  name='login'
                  id='login'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='YourUsername or name@company.com'
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
                  id='password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required
                />
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-start'>
                  <div className='ml-3 text-sm'>
                    <label
                      htmlFor='remember'
                      className='text-gray-500 dark:text-gray-300'
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                {/* <a
                  href='#'
                  className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Forgot password?
                </a> */}
                <Link
                  to='/homepage'
                  className='text-white hover:text-gray-300 mx-4'
                >
                  Continue as Guest
                </Link>
              </div>
              <button
                type='submit'
                className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                Sign in
              </button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Don’t have an account yet?
                <Link
                  to='/register'
                  className='text-white hover:text-gray-300 mx-4'
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
