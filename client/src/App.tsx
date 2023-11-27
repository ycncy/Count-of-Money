import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Article from './Pages/Article';
import Homepage from './Pages/Homepage';
import Login from './authentication/Login';
import Register from './authentication/Register';
import Profile from './authentication/Profile';
import Chart from './Pages/Chart';
import { NewsPages } from './Pages/NewsPages';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/article' element={<Article />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/chart' element={<Chart />} />
          <Route path='/news' element={<NewsPages />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
