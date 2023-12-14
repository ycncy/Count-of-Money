import NavBar from '../composant/Navbar/NavBar';
import React from 'react';
import CardArticle from '../composant/CardArticle/CardArticle';
import CryptoCourses from '../composant/CoursesCrypto/CryptoCourses';
import DefaultFav from '../composant/CoinsFavorites/DefaultFav';
import UserFav from '../composant/CoinsFavorites/UserFav';
import FavKeyword from '../composant/FavoriteKeyord/FavKeyword';
interface HomePageProps {
  username: string;
}
const HomePage: React.FC = () => {
  return (
    <div>
      <NavBar />

      <header>
        <h1>Latest News </h1>
      </header>
      <main>
        <CryptoCourses />
        <div className='container mx-auto'>
          Choice you Favorite Crypto
          <DefaultFav />
        </div>
        <div className='container mx-auto'>
          Your Favorite Coins
          <UserFav />
        </div>
        <section>
          <h2>Featured Articles</h2>
          <CardArticle />
        </section>
        <section>
          <h2>Fav Keyword</h2>
          <FavKeyword />
        </section>
      </main>
      <footer>
        <p>&copy; 2023 My Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
