import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getMe } from '../api/user';
import { NavBarConnectedUser } from '../composant/Navbar/NavBarConnectedUser';
import { NavBar } from '../composant/Navbar/NavBar';

interface CardData {
  title: string;
  content: string;
}

export function Profile() {
  const [cardData, setCardData] = useState<CardData[]>([]);
  
  const { data: user } = useQuery("me", getMe, {
    retry: (_, error: any) => !(error.response?.status === 404),
    enabled: localStorage.getItem("token") !== null,
  });
   
  useEffect(() => {
    fetch('client/data/cards.json')
      .then((response) => response.json())
      .then((data: CardData[]) => {
        console.log('Response:', data);
        setCardData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      {user ? <NavBarConnectedUser user={user}/> : <NavBar />}
      <div className='max-w-7xl mx-auto mt-8 p-10 bg-white rounded shadow-md'>
        <div>
          <div className='flex items-center'>
            <img
              src='../img/logo.png'
              alt='Profile Picture'
              className='w-20 h-20 rounded-full mr-4'
              />
            <div className='w-full lg:w-4/12 px-4 lg:order-1'>
              <div className='flex justify-center py-4 lg:pt-4 pt-8'>
                <div className='mr-4 p-3 text-center'>
                  <span className='text-sm text-blueGray-400'>Username</span>
                  <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
                    John
                  </span>
                </div>
                <div className='lg:mr-4 p-3 text-center'>
                  <span className='text-sm text-blueGray-400'>Level</span>
                  <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
                    Premium
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='max-w-3xl mx-auto mt-8 p-10 bg-red-200 rounded shadow-md'>
          <div className='mt-8'>
            <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none'>
              {cardData.map((card, index) => (
                <li key={index}>
                  <div className='bg-red-600 p-9 rounded-md shadow-md'>
                    <p>{card.title}</p>
                    <p>{card.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='max-w-3xl mx-auto mt-8 p-10 bg-red-200 rounded shadow-md'>
          <h1>Favorite articles</h1>
          <div className='mt-8'>
            <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none'>
              <li>
                <div className='bg-red-600 p-9 rounded-md shadow-md'>
                  <p>Card 1</p>

                  <p>jegruyeripoz"rkoukrgkr toirhtnirytè_</p>
                </div>
              </li>

              <li>
                <div className='bg-red-600 p-9 rounded-md shadow-md'>
                  <p>Card 1</p>

                  <p>jegruyeripoz"rkoukrgkr toirhtnirytè_</p>
                </div>
              </li>

              <li>
                <div className='bg-red-600 p-9 rounded-md shadow-md'>
                  <p>Card 1</p>

                  <p>jegruyeripoz"rkoukrgkr toirhtnirytè_</p>
                </div>
              </li>

              <li>
                <div className='bg-red-600 p-9 rounded-md shadow-md'>
                  <p>Card 1</p>

                  <p>jegruyeripoz"rkoukrgkr toirhtnirytè_</p>
                </div>
              </li>

              <li>
                <div className='bg-red-600 p-9 rounded-md shadow-md'>
                  <p>Card 1</p>

                  <p>jegruyeripoz"rkoukrgkr toirhtnirytè_</p>
                </div>
              </li>
              <li>
                <div className='bg-red-600 p-9 rounded-md shadow-md'>
                  <p>Card 1</p>

                  <p>jegruyeripoz"rkoukrgkr toirhtnirytè_</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
