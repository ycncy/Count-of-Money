import NavBar from '../composant/Navbar/NavBar';
import NavBarConectedUser from '../composant/Navbar/NavBarConectedUser';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Card from '../composant/StatiticCard/Card';
import CardArticle from '../composant/CardArticle/CardArticle';
interface HomePageProps {
  username: string;
}
const HomePage: React.FC = () => {
  return (
    <div>
      <NavBar />
      {/* <NavBarConectedUser username='Lelbi' /> */}
      <header>
        <h1>Latest News </h1>
        <Card />
      </header>
      <main>
        <section>
          <h2>Featured Articles</h2>
          <CardArticle />
          {/* Display featured articles or components here */}
        </section>
        <section>
          <h2>Latest News</h2>

          {/* Display latest news or components here */}
        </section>
      </main>
      <footer>
        <p>&copy; 2023 My Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
