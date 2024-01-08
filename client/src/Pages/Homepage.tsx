import React, { useEffect } from 'react';

import { NavBar } from '../composant/Navbar/NavBar';
import { CardArticle } from '../composant/CardArticle/CardArticle';
import { CryptoCourses } from '../composant/CoursesCrypto/CryptoCourses';
import { DefaultFav } from '../composant/CoinsFavorites/DefaultFav';
import { UserFav } from '../composant/CoinsFavorites/UserFav';
import { FavKeyword } from '../composant/FavoriteKeyord/FavKeyword';
import { useState } from 'react';
import cookies from 'js-cookie';
import { NavBarConnectedUser } from '../composant/Navbar/NavBarConnectedUser';
import { useQuery } from 'react-query';
import { getMe } from '../api/user';
interface HomePageProps {
  username: string;
}
export function Homepage() {
  const [isUserLogged, setIsUserLogged] = useState<boolean>(false);

  const { data: user } = useQuery("me", getMe, {
    retry: (_, error: any) => !(error.response?.status === 404),
    enabled: localStorage.getItem("token") !== null,
  });
  
  useEffect(() => {
    const accesToken = cookies.get('access_token');
    if (accesToken) {
      console.log(`connected`);
      setIsUserLogged(true);
    }
  }, []);
  return (
    <div>
      {isUserLogged ? <NavBarConnectedUser user={user}/> : <NavBar />}

      <header>
        <h1>Latest News </h1>
      </header>
      <main>
        {/* <CryptoCourses /> */}
        <div className='container mx-auto'>
          Choose you Favorite Crypto
          <DefaultFav isLoggedIn={isUserLogged} />
        </div>
        {isUserLogged && (
          <div className='container mx-auto'>
            Your Favorite Coins
            <UserFav isLoggedIn={isUserLogged} />
          </div>
        )}
        <section>
          <h2>Featured Articles</h2>
          <CardArticle />
        </section>
        <section>
          <h2>Fav Keyword</h2>
          <FavKeyword isLoggedIn={isUserLogged} />
        </section>
      </main>
      <footer>
        <p>&copy; 2023 My Website. All rights reserved.</p>
      </footer>
    </div>
  );
}
