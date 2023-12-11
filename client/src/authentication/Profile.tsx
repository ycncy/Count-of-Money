import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProfileModal from '../composant/ProfileModalProps/ProfileModalProps';

const Profile: React.FC = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        baseCurrency: '',
      });
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [favoriteCryptos, setFavoriteCryptos] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);

     
    const handleOpenModal = () => {
        setModalOpen(true);        
        setDropdownVisible(false);

      };
    
      const handleCloseModal = () => {
        setModalOpen(false);
      };

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          console.log(axios.get(
            'http://localhost:5000/api/users/profile',
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            ));
          const response = await axios.get(''); 
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      // const fetchFavoriteCryptos = async () => {
      //   try {
      //     const response = await axios.get('/api/favoriteCryptos');
      //     setFavoriteCryptos(response.data);
      //   } catch (error) {
      //     console.error('Error fetching favorite cryptocurrencies:', error);
      //   }
      // };
  
      // fetchFavoriteCryptos();
      fetchUserData();
    }, []);

    const toggleDropdown = () => {
      setDropdownVisible(!isDropdownVisible);
    };
    const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTagInput(event.target.value);
      };
    
      const handleAddTag = (event: React.FormEvent) => {
        event.preventDefault();
        if (tagInput.trim() !== '') {
          if (tags.length < 5) {
            setTags([...tags, tagInput]);
            setTagInput('');
          } else {
            console.warn('Maximum number of tags reached (5).');
          }
        }
      };
      const handleRemoveTag = (index: number) => {
        const updatedTags = [...tags];
        updatedTags.splice(index, 1);
        setTags(updatedTags);
      };
      const handleUpdateProfile = (formData: { name: string; email: string; password: string }) => {
        // Handle the profile update logic here
        console.log('Updating profile with data:', formData);
        // You might want to make an API call or dispatch an action here
      };
    
  return (
    <section><ProfileModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleUpdateProfile}
      />
    <div className={`flex items-center justify-end mb-6 bg-gray-100 p-4 rounded shadow-lg relative ${isModalOpen ? 'z-0' : 'z-10'}`}>
        <img
          src=""
          alt=""
          className="w-10 h-10 rounded-full mr-2 mx-6"
        />
        <div>
          <p className='mx-2 font-sans font-bold mr-4'>Username</p>
        </div>
        <div className="ml-auto">
        <ul className="flex items-center gap-2 2xsm:gap-4">
      <li>
                <svg className='mr-6'  onClick={toggleDropdown} xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg> 
              {isDropdownVisible && (
                <div className ="absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
                    <li>
                    <button
                    className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                    onClick={handleOpenModal}
                  >
                    Modifier le profil
                  </button>                    
                  </li>
                    <li>
                    <a className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base" href="/update-profile">Autre chose</a>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li>
            </li>
          </ul>
        </div>          
      </div>
 
      <div className="max-w-7xl mx-auto  p-10 bg-white rounded">    
  

        <div className="ud-mx-auto ud-mt-15 ud-max-w-292.5 ud-px-4 sm:ud-px-8 xl:ud-px-0">
        <h2 className="text-xl font-bold mb-2">Ajouter des mots clés</h2>
        <p className="italic my-5">Ajoutez jusqu'à 5 mots clé, cela vous aidera à obtenir des résultat plus pertinants.</p>
        <form className="flex items-center" onSubmit={handleAddTag}>
        <label />
        <div className=" w-full">
          <input
            type="text"
            id="simple-search"
            value={tagInput}
            onChange={handleTagInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Saisissez votre mot clé..."
            required
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Ajouter
        </button>
      </form>
      <div className="mt-4">
        {tags.map((tag, index) => (
          <span key={index} className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full mr-2 mb-2">
            
            {tag}
            
            <button
              type="button"
              className="ml-2 text-gray-500 hover:text-gray-500 focus:outline-none"
              onClick={() => handleRemoveTag(index)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/>
                    </svg>         
                    </button>
          </span>
        ))}
      </div>

        <div className="mt-10">
        <h2 className="text-xl font-bold my-4">Mes cryptos favoris</h2>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none">
          {favoriteCryptos.map((crypto, index) => (
            <li key={index}>
              <a href="/#" className="animate_bottom dark:hover:ud-custom-dark-shadow bg-gray p-9 rounded-md shadow-md border border-gray-600 flex items-center">
                {/* Replace the following with your actual crypto data */}
                <svg className="ud-mb-7.5" xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 512 512">
                  {/* Crypto icon/path */}
                </svg>
                {/* <h4 className=''>{crypto.name}</h4> Replace with the actual property from your crypto data */}
              </a>
            </li>
          ))}
        </ul>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none">
              <li>
                <a href="/#" className="animate_bottom dark:hover:ud-custom-dark-shadow bg-gray p-9 rounded-md shadow-md border border-gray-600 flex items-center">
                  <svg className="ud-mb-7.5" xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 512 512">
                    <path d="M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-141.7-35.3c4.9-33-20.2-50.7-54.6-62.6l11.1-44.7-27.2-6.8-10.9 43.5c-7.2-1.8-14.5-3.5-21.8-5.1l10.9-43.8-27.2-6.8-11.2 44.7c-5.9-1.3-11.7-2.7-17.4-4.1l0-.1-37.5-9.4-7.2 29.1s20.2 4.6 19.8 4.9c11 2.8 13 10 12.7 15.8l-12.7 50.9c.8 .2 1.7 .5 2.8 .9-.9-.2-1.9-.5-2.9-.7l-17.8 71.3c-1.3 3.3-4.8 8.4-12.5 6.5 .3 .4-19.8-4.9-19.8-4.9l-13.5 31.1 35.4 8.8c6.6 1.7 13 3.4 19.4 5l-11.3 45.2 27.2 6.8 11.2-44.7a1038.2 1038.2 0 0 0 21.7 5.6l-11.1 44.5 27.2 6.8 11.3-45.1c46.4 8.8 81.3 5.2 96-36.7 11.8-33.8-.6-53.3-25-66 17.8-4.1 31.2-15.8 34.7-39.9zm-62.2 87.2c-8.4 33.8-65.3 15.5-83.8 10.9l14.9-59.9c18.4 4.6 77.6 13.7 68.8 49zm8.4-87.7c-7.7 30.7-55 15.1-70.4 11.3l13.5-54.3c15.4 3.8 64.8 11 56.8 43z"/></svg>                  
                    <h4 className=''>jegruyeripoz"rkoukrgkr
                  toirhtnirytè_</h4>
                </a>
              </li>

              <li>
                <div className="bg-gray- p-9 rounded-md shadow-md">
                  <p>Card 1</p>

                  <p>jegruyeripoz"rkoukrgkr
                    toirhtnirytè_</p>
                </div>
              </li>

              <li>
                <div className="bg-gray p-9 rounded-md shadow-md">
                  <p>Card 1</p>

                  <p>jegruyeripoz"rkoukrgkr
                    toirhtnirytè_</p>
                </div>
              </li>

              <li>
                <div className="bg-gray p-9 rounded-md shadow-md">
                  <p>Card 1</p>

                  <p>jegruyeripoz"rkoukrgkr
                    toirhtnirytè_</p>
                </div>
              </li>

              <li>
                <div className="bg-gray p-9 rounded-md shadow-md">
                  <p>Card 1</p>

                  <p>jegruyeripoz"rkoukrgkr
                    toirhtnirytè_</p>
                </div>
              </li>
              <li>
                <div className="bg-gray p-9 rounded-md shadow-md">
                  <p>Card 1</p>

                  <p>jegruyeripoz"rkoukrgkr
                    toirhtnirytè_</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      

      </section>
  );
};

export default Profile;