import React from 'react';
import { Link } from 'react-router-dom';
import NavBarConnectedUser from '../composant/Navbar/NavBarConnectedUser';
import CardArticle from '../composant/CardArticle/CardArticle';
import Footer from '../composant/Footer/Footer';

interface RouteParams {
  id: string;
}

const Article: React.FC = () => {
  return (
    <div>
      <NavBarConnectedUser username='Lelbi' />
      <h1>Article Page</h1>
      <Link to='/'>Homepage</Link>
      <CardArticle />
      <Footer />
    </div>
  );
};

export default Article;
