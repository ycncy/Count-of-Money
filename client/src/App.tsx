// App.tsx

// import React from 'react';
// import NavBar from './composant/Navbar/NavBar';
// import NavBarConectedUser from './composant/Navbar/NavBarConectedUser';
// import Profil from './Pages/Profil';
// import Card from './composant/StatiticCard/Card';
// import CryptoCourses from './composant/CoursesCrypto/CryptoCourses';
// import CardArticle from './composant/CardArticle/CardArticle';
// import Article from './Pages/Article';
// const App: React.FC = () => {
//   return (
//     <div>
//       <NavBar />
//       {/* <NavBarConectedUser />
//       <Profil /> */}
//       <CryptoCourses />
//       <CardArticle />
//       <Card />
//       <Article />
//     </div>
//   );
// };

// export default App;

// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Article from './Pages/Article';
import Homepage from './Pages/Homepage';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Autres routes */}
        <Route path='/' element={<Homepage />} />

        <Route path='/article/:id' element={<Article />} />
      </Routes>
    </Router>
  );
};

export default App;
