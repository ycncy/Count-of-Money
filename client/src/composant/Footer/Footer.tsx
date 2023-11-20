import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className='bg-gray-200 text-center lg:text-left'>
      {/* Section pour les icônes de réseaux sociaux */}
      <div className='py-6 px-6 bg-gray-300'>
        <div className='flex justify-center mb-6'>
          {/* Icônes des réseaux sociaux */}
          <a href='#!' className='mr-6 text-gray-600'>
            <i className='fab fa-facebook-f'></i>
          </a>
          <a href='#!' className='mr-6 text-gray-600'>
            <i className='fab fa-twitter'></i>
          </a>
          {/* ... autres icônes ... */}
        </div>
        <div className='text-center text-gray-600'>
          <span>Get connected with us on social networks:</span>
        </div>
      </div>

      {/* Section pour le contenu du footer */}
      <div className='container p-6 mx-auto'>
        <div className='flex justify-evenly'>
          {/* Section Crypto ++ */}
          <div className='mb-6'>
            <h6 className='uppercase font-semibold mb-4 flex items-center justify-center'>
              <i className='fas fa-gem mr-3'></i> Crypto ++
            </h6>
            <p>Some description about Crypto ++...</p>
          </div>

          {/* Section Products */}
          <div className='mb-6'>
            <h6 className='uppercase font-semibold mb-4'>Products</h6>
            <p>
              <a href='#!' className='text-gray-600'>
                Product 1
              </a>
            </p>
          </div>

          {/* Section Useful links */}
          <div className='mb-6'>
            <h6 className='uppercase font-semibold mb-4'>Useful links</h6>
            <p>
              <a href='#!' className='text-gray-600'>
                Link 1
              </a>
            </p>
          </div>

          {/* Section Contact */}
          <div className='mb-6'>
            <h6 className='uppercase font-semibold mb-4'>Contact</h6>
            <p>
              <a href='#!' className='text-gray-600'>
                info@example.com
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className='text-gray-600 text-center p-4 bg-gray-100'>
        © 2023 Copyright:
        <a
          className='text-gray-600 font-semibold'
          href='https://mdbootstrap.com/'
        >
          MDBootstrap.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;
