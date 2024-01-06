import React from 'react';
import { useLocation } from 'react-router-dom';

export function CardArticle() {
  const location = useLocation();
  const { news } = location.state || { news: {} };

  if (news) {
    return (
      <div className='w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
        <div id='defaultTabContent'>
          <div
            className='p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800'
            id='about'
            role='tabpanel'
            aria-labelledby='about-tab'
          >
            <h2 className='mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white'>
              {news.title}
            </h2>
            <p className='mb-3 text-gray-500 dark:text-gray-400'>{news.guid}</p>
            <p className='mb-3 text-gray-500 dark:text-gray-400'>
              {news.pubDate}
            </p>
            <p className='mb-3 text-gray-500 dark:text-gray-400'>
              {news.categories}
            </p>
            <p className='mb-3 text-gray-500 dark:text-gray-400'>
              {news.source}
            </p>
            <p className='mb-3 text-gray-500 dark:text-gray-400'>
              {news.summary}
            </p>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href={news.link}
              className='inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700'
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>no news</div>;
  }
}
