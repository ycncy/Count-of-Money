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
interface HomePageProps {
  username: string;
}
export function Homepage() {
  const [isUserLogged, setIsUserLogged] = useState<boolean>(false);

  useEffect(() => {
    const accesToken = cookies.get('access_token');
    console.log(cookies.get('access_token'));
    if (accesToken) {
      console.log(`connected`);
      setIsUserLogged(true);
    }
  }, []);
  return (
    <div>
      {isUserLogged ? <NavBarConnectedUser /> : <NavBar />}

      <header>
        <h1>Latest News </h1>
      </header>
      <main>
        {/* <CryptoCourses /> */}
        <div className='container mx-auto'>
          Choice you Favorite Crypto
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
