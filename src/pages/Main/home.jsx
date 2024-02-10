import React from 'react';
import { Link } from 'react-router-dom';
import Svg2 from './svg2.png';

const Home1 = () => {
  return (
    <div className='flex h-screen'>
      {/* Left half */}
      <div className="flex-1 bg-white flex flex-col justify-center items-center">
        <h1 className='font-semibold text-8xl mb-4 relative'>co<span style={{ color: 'rgb(7, 90, 158)' }}>V</span>ac</h1>
        <p className='text-center text-lg mt-4 mb-10' style={{ color: 'rgb(7, 90, 158)' }}>The ultimate site to check the availability and book your <br/> Covid Vaccination slots!</p>
        <img className='h-72 w-auto mb-8' src={Svg2} alt="SVG Image" />
      </div>

      {/* Right half */}
      <div className="flex-1 flex justify-center items-center" style={{ backgroundColor: 'rgb(226, 239, 250)' }}>
        <div className='bg-white w-80 p-14 rounded-lg'>
          <p className='font-normal text-3xl text-center mt-4 mb-9'>Welcome!</p>
          <Link to="/login" className='block bg-black text-white text-center text-lg py-3 mb-5 rounded-md '>Login</Link>
          <Link to="/signup" className='block text-white text-center text-lg py-3 rounded-md' style={{ backgroundColor: 'rgb(7, 90, 158)' }}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Home1;






