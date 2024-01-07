import { useQuery } from 'react-query';
import { getMe, getNews } from '../api/user';
import { NewsPage } from './News';
import { NavBarConnectedUser } from '../composant/Navbar/NavBarConnectedUser';
import { useState } from 'react';
import Spinner from '../composant/Spinner';

export const NewsPages = () => {
  const [search, setSearch] = useState('');
  const { data: user } = useQuery('me', getMe, {
    retry: (_, error: any) => !(error.response?.status === 404),
    enabled: localStorage.getItem('token') !== null,
  });
  const {
    data: News,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useQuery(['News'], () => getNews(search), {
    enabled: !!search && !!user,
  });

  return (
    <div>
      <h1>News</h1>
      <NavBarConnectedUser />
      {isFetching && <Spinner />}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          rowGap: 10,
          columnGap: 10,
          margin: 10,
          flexWrap: 'wrap',
        }}
      >
        {News?.map((news) => (
          <NewsPage key={news.guid} {...news} />
        ))}
      </div>
    </div>
  );
};
