import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Article from './Pages/Article';
import Homepage from './Pages/Homepage';
import Login from './authentication/Login';
import Register from './authentication/Register';
import Profile from './authentication/Profile';
// import Chart from './Pages/Chart';
import { NewsPages } from './Pages/NewsPages';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Coins } from './Pages/Coins';
import { LocalCoins } from './Pages/LocalCoins';
import { CardArticle } from './composant/CardArticle/CardArticle';
import { Admin } from './Pages/Admin';
import { Charts } from './Pages/Charts';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          {/* <Route path='/article' element={<Article />} /> */}
          <Route path='/profile' element={<Profile />} />
          {/* <Route path='/chart' element={<Chart />} /> */}
          <Route path='/articles' element={<NewsPages />} />
          <Route path='/coins' element={<Coins />} />
          <Route path='/localcoins' element={<LocalCoins />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/article' element={<CardArticle />} />
          <Route path= '/chartCoin' element = {<Charts />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
