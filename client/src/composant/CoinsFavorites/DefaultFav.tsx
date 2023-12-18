import React from 'react';
import { addToFavouritesCoins, getLocalCoins, getMe } from '../../api/user';
import { useQuery } from 'react-query';

const DefaultFav = () => {
  const { data: user } = useQuery('me', getMe, {
    retry: (_, error: any) => !(error.response?.status === 404),
    enabled: localStorage.getItem('token') !== null,
  });

  const { data: defaultFav, isFetching } = useQuery(
    ['defaultFav'],
    () => getLocalCoins(),
    {
      enabled: !!user,
    }
  );
  const addToUserFavorites = async (coinId: number) => {
    try {
      const response = await addToFavouritesCoins(coinId);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4'>
      {/* First Card */}
      {defaultFav?.map((coin) => (
        <div className='bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group'>
          <div className='flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12'>
            <img
              width='30'
              height='30'
              src={coin.imageUrl}
              alt=''
              className='stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out'
            />
          </div>
          <div className='text-right'>
            <p className='text-2xl'>{coin.fullName}</p>
            <p>{coin.symbol}</p>
          </div>
          <svg
            className='w-6 h-6 text-gray-800 dark:text-white'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 21 19'
            onClick={() => addToUserFavorites(coin.coinId)}
          >
            <path
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z'
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default DefaultFav;
