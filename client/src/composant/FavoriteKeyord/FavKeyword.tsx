import React from 'react';
import { useQuery } from 'react-query';
import { getMe } from '../../api/user';

const FavKeyword = () => {
  const { data: user } = useQuery('me', getMe, {
    retry: (_, error: any) => !(error.response?.status === 404),
    enabled: localStorage.getItem('token') !== null,
  });

  return (
    <div>
      {user?.keywords?.map((keyword) => (
        <div>
          <a
            href='#'
            className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
          >
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              {keyword}
            </h5>
          </a>
        </div>
      ))}
    </div>
  );
};

export default FavKeyword;
