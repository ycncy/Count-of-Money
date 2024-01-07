import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProfileModal from '../composant/ProfileModalProps/ProfileModalProps';
import { getProfile, updateProfile, addKeywords, deleteKeyword } from '../services/users/public/public.users.service';

export default  function Profile ()  {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        baseCurrency: '',
      });
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [favoriteCryptos, setFavoriteCryptos] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [warningMessage, setWarningMessage] = useState(''); 

     
    const handleOpenModal = () => {
        setModalOpen(true);        
        setDropdownVisible(false);

      };
    
      const handleCloseModal = () => {
        setModalOpen(false);
      };

      useEffect(() => {
        const fetchData = async () => {
          try {
            const user = await getProfile();
            setUserData({
              username: user.username,
              email: user.email,
              password: '', 
              baseCurrency: user.baseCurrency,
            });
          
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
      
        fetchData();
      }, []);
      
    const toggleDropdown = () => {
      setDropdownVisible(!isDropdownVisible);
    };
    const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTagInput(event.target.value);
      };
    
      const handleAddTag = async (event: React.FormEvent) => {
        event.preventDefault();
      
        if (tagInput.trim() !== '') {
          if (tags.length < 5) {
            setTags([...tags, tagInput]);
      
            try {
              await addKeywords({ keywords: [...tags, tagInput] });
            } catch (error) {
              console.error('Error adding keyword:', error);
            }
      
            setTagInput('');
            setWarningMessage(''); 
          } else {
            setWarningMessage('Nombre maximum atteint.');
          }
        }
      };
      
      const handleRemoveTag = async (index: number) => {
        const updatedTags = [...tags];
        const removedTag = updatedTags.splice(index, 1)[0];
        setTags(updatedTags);
        try {
          await deleteKeyword(removedTag);
        } catch (error) {
          console.error('Error deleting keyword:', error);
        }
      };
      

      const handleUpdateProfile = async (formData: { username: string; email: string; password: string, baseCurrency: string }) => {
        try {
          const updatedUser = await updateProfile(formData);
          setUserData(updatedUser);
          handleCloseModal();
        } catch (error) {
          console.error('Error updating user profile:', error);
        }
      };
      
      
    
  return (
    <section>
    <ProfileModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleUpdateProfile} />

    <div className={`flex items-center justify-end mb-6 bg-gray-100 p-4 rounded shadow-lg relative ${isModalOpen ? 'z-0' : 'z-10'}`}>
        <div>
          <p className='mx-2 font-sans font-bold mr-4'>{userData.username || ''}</p>
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
                    {/* <li>
                    <a className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base" href="/update-profile">Autre chose</a>
                    </li> */}
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
        {warningMessage && (
        <p className="text-red-500 mt-2">{warningMessage}</p>
      )}
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
      </div>
    </div>
      
</section>
  );
};

