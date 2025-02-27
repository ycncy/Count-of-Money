import { useNavigate } from 'react-router-dom';
import { News } from '../types';
import {publicUsersService} from "../services/users/public/public.users.service";

export const NewsPage = (news: News) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/article', { state: { news } });
  };
  const handleFavouriteClick = (event: any, cat: string) => {
    event.stopPropagation();
    addToUserFavorites(cat);
  };
  const addToUserFavorites = async (keyword: string) => {
    try {
        await publicUsersService.addKeywords({
            keywords: [keyword]
        })
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div
        className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'
        onClick={handleCardClick}
        style={{
          height: 400,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {news.title}
        </h5>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          {news.creator}
        </p>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          {news.pubDate}
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            columnGap: '5px',
            rowGap: '5px',
            flexWrap: 'wrap',
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          {/* <svg
              className='w-6 h-6 text-gray-800 dark:text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 21 19'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z'
              />
            </svg> */}
          {news.categories.map((cat: string) => (
            <button
              type='button'
              className='text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500'
              onClick={(event) => {
                handleFavouriteClick(event, cat);
              }}
              style={{ padding: 5 }}
            >
              <h6>{cat}</h6>
            </button>
          ))}
        </div>
        <a
          target='_blank'
          href={news.link}
          style={{ width: 'fit-content' }}
          className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Read more
          <svg
            className='rtl:rotate-180 w-3.5 h-3.5 ms-2'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 10'
          >
            <path
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M1 5h12m0 0L9 1m4 4L9 9'
            />
          </svg>
        </a>
      </div>
    </div>
  );
};
