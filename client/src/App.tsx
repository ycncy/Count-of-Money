// App.tsx

// import React from 'react';
// import NavBar from './composant/Navbar/NavBar';
// import NavBarConectedUser from './composant/Navbar/NavBarConectedUser';
// import Profile from './Pages/Profile';
// import Card from './composant/StatiticCard/Card';
// import CryptoCourses from './composant/CoursesCrypto/CryptoCourses';
// import CardArticle from './composant/CardArticle/CardArticle';
// import Article from './Pages/Article';
// const App: React.FC = () => {
//   return (
//     <div>
//       <NavBar />
//       {/* <NavBarConectedUser />
//       <Profile /> */}
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
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import Profile from "./authentication/Profile";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register/>} />
          <Route path='/article' element={<Article />} />
          <Route path='/profile' element={<Profile/>} />

      </Routes>
    </Router>
  );
};

export default App;
