import React, {useEffect} from 'react';

import {NavBar} from '../composant/Navbar/NavBar';
import {CardArticle} from '../composant/CardArticle/CardArticle';
import {CryptoCourses} from '../composant/CoursesCrypto/CryptoCourses';
import {DefaultFav} from '../composant/CoinsFavorites/DefaultFav';
import {UserFav} from '../composant/CoinsFavorites/UserFav';
import {FavKeyword} from '../composant/FavoriteKeyord/FavKeyword';
import {useState} from 'react';
import cookies from 'js-cookie';
import {NavBarConnectedUser} from '../composant/Navbar/NavBarConnectedUser';

interface HomePageProps {
    username: string;
}

export function Homepage() {
    const [isUserLogged, setIsUserLogged] = useState<boolean>(false);

    useEffect(() => {
        const accessToken = cookies.get('access_token');
        if (accessToken) {
            setIsUserLogged(true);
        }
    }, []);
    return (
        <div className="min-h-screen bg-[#171B26]">
            {isUserLogged ? <NavBarConnectedUser/> : <NavBar/>}
            <div className="flex-col">
                <div className='container'>
                    <h1 className="text-3xl text-white font-semibold p-4">Crypto-currencies</h1>
                    <DefaultFav isLoggedIn={isUserLogged}/>
                </div>
                {isUserLogged && (
                    <div>
                        <h1 className="text-3xl text-white font-semibold p-4">Your Favorite Coins</h1>
                        <UserFav isLoggedIn={isUserLogged}/>
                    </div>
                )}
                <section>
                    <h2 className="text-3xl text-white font-semibold p-4">Featured Articles</h2>
                    <CardArticle/>
                </section>
            </div>
            {/*<footer>
        <p>&copy; 2023 My Website. All rights reserved.</p>
      </footer>*/}
        </div>
    );
}
