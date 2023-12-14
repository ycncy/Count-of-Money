import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../composant/Footer/Footer';

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
