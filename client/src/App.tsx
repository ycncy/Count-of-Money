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
