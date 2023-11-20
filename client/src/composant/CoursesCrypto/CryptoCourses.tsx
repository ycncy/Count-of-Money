import React from 'react';

const CryptoCourses: React.FC = () => {
  return (
    <div className='relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded'>
      <div className='rounded-t mb-0 px-0 border-0'>
        <div className='flex flex-wrap items-center px-4 py-2'>
          <div className='relative w-full max-w-full flex-grow flex-1'>
            <h3 className='font-semibold text-base text-gray-900 dark:text-gray-50'>
              Courses of Crypto
            </h3>
          </div>
          <div className='relative w-full max-w-full flex-grow flex-1 text-right'>
            <button
              className='bg-blue-500 dark:bg-gray-100 text-white active:bg-blue-600 dark:text-gray-800 dark:active:text-gray-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
              type='button'
            >
              See all
            </button>
          </div>
        </div>
        <div className='block w-full overflow-x-auto'>
          <table className='items-center w-full bg-transparent border-collapse'>
            <thead>
              <tr>
                <th className='px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                  Referral
                </th>
                <th className='px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                  Visitors
                </th>
                <th className='px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px'></th>
              </tr>
            </thead>
            <tbody>
              <tr className='text-gray-700 dark:text-gray-100'>
                <th className='border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left'>
                  Facebook
                </th>
                <td className='border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                  5,480
                </td>
                <td className='border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                  <div className='flex items-center'>
                    <span className='mr-2'>70%</span>
                    <div className='relative w-full'>
                      <div className='overflow-hidden h-2 text-xs flex rounded bg-blue-200'>
                        <div
                          style={{ width: '70%' }}
                          className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600'
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CryptoCourses;
