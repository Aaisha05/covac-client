import React from 'react';

const Footer = () => {
  return (
    <footer className=' px-3 mt-20 h-[5rem]'style={{ backgroundColor: 'rgb(226, 239, 250)' }}>
      <div className="flex flex-col lg:flex-row justify-center items-center h-full">
        <a href='/chat-bot' className="mr-4 mb-2 lg:mb-0 text-sm lg:text-base">Chat Bot</a>
        <span className="text-gray-600 hidden lg:block">| </span>
        <a href='/users/dash' className="mr-4 mb-2 lg:mb-0 ml-4 text-sm lg:text-base">Home</a>
        <span className="text-gray-600 hidden lg:block">|</span>
        <span className="ml-4 text-sm lg:text-base">© 2024 coVac. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;


