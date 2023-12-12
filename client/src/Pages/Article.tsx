import React from 'react';
import { Link } from 'react-router-dom';
import NavBarConnectedUser from '../composant/Navbar/NavBarConnectedUser';
import CardArticle from '../composant/CardArticle/CardArticle';
import Footer from '../composant/Footer/Footer';
import { NewsPage } from './News';

const Article: React.FC = () => {
  return (
    <div>
      <h1>Article Page</h1>
      <Link to='/'>Homepage</Link>

      <Footer />
    </div>
  );
};

export default Article;
