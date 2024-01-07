import React from 'react';
import {LocalCoin} from '../../services/coins/public/public.coins.interfaces';
import {publicCoinsService} from '../../services/coins/public/public.coins.service';
import {publicFavoritesService} from '../../services/favorites/public/public.favorites.service';
import {Link} from "react-router-dom";
import useSWR, {mutate} from 'swr'

interface UserFavProps {
    isLoggedIn: boolean;
}

export function DefaultFav({isLoggedIn}: UserFavProps) {
    let {data, isLoading} = useSWR('/coins',
        () => publicCoinsService.getLocalCoins().catch((err) => console.log(err)),
    )

    let {data: favorites, isLoading: isLoadingFavorites} = useSWR('/favorites',
        () => publicFavoritesService.getUserFavorites().catch((err) => console.log(err)),
    )

    const addToUserFavorites = async (coinId: number) => {
        try {
            await publicFavoritesService.addUserFavorite(coinId);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-screen mb-4 p-4 flex overflow-scroll gap-4">
            {isLoading && <div>Loading...</div>}
            {data?.map((coin: LocalCoin) => (
                <div className='gap-12 bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-gray-600 text-white font-medium group'>
                    <Link
                        className="flex items-center gap-2 w-full"
                        to={`/chart/${coin.coinId}`}>
                        <div
                            className='flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12'>
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
                    </Link>
                    {isLoggedIn && (
                        <svg
                            className={`w-8 h-8 text-white cursor-pointer ${favorites?.some((favorite: LocalCoin) => favorite.id === coin.coinId) ? 'fill-white' : 'hover:fill-white'}`}
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
                    )}
                </div>
            ))}
        </div>
    );
}
