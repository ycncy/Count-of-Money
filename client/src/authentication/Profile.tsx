import React, { useEffect, useState } from 'react';

interface CardData {
  title: string;
  content: string;
}

const Profile: React.FC = () => {
  const [cardData, setCardData] = useState<CardData[]>([]);

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
      <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">User Profile</h2>

          <form action="#" method="POST">

              <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
                  <p className="mt-1 p-2 w-full border rounded-md bg-gray-100">YourUsername</p>
              </div>

              <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                  <p className="mt-1 p-2 w-full border rounded-md bg-gray-100">YourEmail</p>
              </div>

              <div className="mb-4">
                  <label htmlFor="creationDate" className="block text-sm font-medium text-gray-600">Creation
                      Date</label>
                  <p className="mt-1 p-2 w-full border rounded-md bg-gray-100">2023-11-27</p>
              </div>
              <div className="mb-4">
                  <label htmlFor="creationDate" className="block text-sm font-medium text-gray-600">Update
                      Date</label>
                  <p className="mt-1 p-2 w-full border rounded-md bg-gray-100">2023-11-27</p>
              </div>
              <div className="mb-4">
                  <label htmlFor="creationDate" className="block text-sm font-medium text-gray-600">Base currency</label>
                  <p className="mt-1 p-2 w-full border rounded-md bg-gray-100">Dollar</p>
              </div>

              <div className="mt-6">
                  <button type="submit"
                          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                      Update Profile
                  </button>
              </div>
          </form>
      </div>
  );
};

export default Profile;
