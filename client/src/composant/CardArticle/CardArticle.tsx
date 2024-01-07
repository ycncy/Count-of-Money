import React from 'react';
import {useQuery} from "react-query";
import {newsService} from "../../services/news/news.service";
import {NewsArticle} from "../../services/news/news.interfaces";
import moment from "moment";

export function CardArticle() {
  const { data: news } = useQuery(
      ["News"],
      async () => await newsService.getNews([]),
  );

  if (news) {
    return (
      <div className='p-4 w-full grid grid-cols-1 md:grid-cols-3 gap-4 rounded-lg'>
        {
          news.slice(6).map((article: NewsArticle) => (
                <div
                    className='p-4 rounded-lg md:p-8 dark:bg-gray-800'
                    id='about'
                    role='tabpanel'
                    aria-labelledby='about-tab'
                >
                  <h2 className='mb-3 text-xl font-extrabold tracking-tight text-white'>
                    {article.title}
                  </h2>
                  <p className='mb-3 text-gray-500 dark:text-gray-400'>
                    {moment(article.pubDate).format('DD/MM/YYYY HH:mm')}
                  </p>
                  {article.categories.map((category: string) => (
                      <span
                          className='border rounded-full mb-2 inline-block px-2 py-1 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 dark:bg-gray-800 dark:text-gray-200'
                          key={category}
                      >
                    {category}
                    </span>
                  ))}
                  <p className='mb-3 text-gray-500 text-sm dark:text-gray-400'>
                    {article.summary}
                  </p>
                  <a
                      target='_blank'
                      rel='noopener noreferrer'
                      href={article.link}
                      className='inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700'
                  >
                    Learn more
                  </a>
                </div>
          ))
        }
      </div>
    );
  } else {
    return <div>no news</div>;
  }
}
