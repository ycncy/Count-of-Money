import React, {useEffect} from 'react';
import {publicFavoritesService} from "../../services/favorites/public/public.favorites.service";
import {LocalCoin} from "../../services/coins/public/public.coins.interfaces";

const DefaultFav = () => {
  const [userFavorites, setUserFavorites] = React.useState<LocalCoin[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response: LocalCoin[] = await publicFavoritesService.getUserFavorites();
      console.log(response)
      setUserFavorites(response);
    };
    fetchData();
  }, []);

  const removeFromUserFavorites = async (coinId: number) => {
    try {
      await publicFavoritesService.deleteUserFavorite(coinId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4'>
      {userFavorites?.map((coin: LocalCoin) => (
        <div className='bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group'>
          <div className='flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12'>
            {coin?.imageUrl && (
              <img
                width='30'
                height='30'
                src={coin.imageUrl}
                alt=''
                className='stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out'
              />
            )}
          </div>
          <div className='text-right'>
            <p className='text-2xl'>{coin.fullName}</p>
            <p>{coin.symbol}</p>
          </div>
          <svg
            className='w-6 h-6 text-gray-800 dark:text-white'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 18 20'
            onClick={() => removeFromUserFavorites(coin.coinId)}
          >
            <path d='M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z' />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default DefaultFav;
