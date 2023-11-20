import NavBar from '../composant/Navbar/NavBar';
import NavBarConnectedUser from '../composant/Navbar/NavBarConnectedUser';
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div>
      <NavBar />
      <NavBarConnectedUser username='Lelbi' />
      <header>
        <h1>Welcome to My Website</h1>
      </header>
      <main>
        <section>
          <h2>Featured Articles</h2>
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
