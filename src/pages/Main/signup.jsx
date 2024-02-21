import React, { useState } from 'react';
import axios from 'axios';
import Svg2 from './svg2.png';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://covac-server-1.onrender.com/signup', values)
      .then(res => alert("Registered successfully"))
      .catch(err => console.log(err));
  }

  return (
    <div className='flex h-screen'>

      {/* Left half - Display only on screens larger than small */}
      <div className="hidden sm:flex sm:flex-1 sm:bg-white sm:flex-col sm:justify-center sm:items-center">
        
        <h1 className='font-semibold text-8xl mb-4 relative'>co<span style={{ color: 'rgb(7, 90, 158)' }}>V</span>ac</h1>
        <p className='text-center text-lg mt-4 mb-10' style={{ color: 'rgb(7, 90, 158)' }}>The ultimate site to check the availability and book your <br/> Covid Vaccination slots!</p>
        <img className='h-72 w-auto mb-8' src={Svg2} alt="SVG Image" />
      </div>

      {/* Right half - Display on all screens */}
      <div className="flex-1 flex justify-center items-center"style={{ backgroundColor: 'rgb(226, 239, 250)' }}>
        <div className='bg-white w-80 p-8 rounded-lg'>
          <h1 className="text-2xl font-bold text-center mb-4">SignUp</h1>
          <form onSubmit={handleSubmit} id="signupForm">
            <label>Username:</label>
            <input type="text" id="username" name="username" placeholder="Username" required onChange={handleChange} className="w-full px-3 py-2 mb-4 border border-gray-300 rounded" />
            <label>Email:</label>
            <input type="text" id="email" name="email" placeholder="Email" required onChange={handleChange} className="w-full px-3 py-2 mb-4 border border-gray-300 rounded" />
            <label>Password:</label>
            <input type="password" id="password" name="password" placeholder="Password" required onChange={handleChange} className="w-full px-3 py-2 mb-4 border border-gray-300 rounded" />
            <div className='flex justify-center'>
              <button type="submit" className="bg-blue-500 text-white w-40 py-2 rounded">
                Sign Up
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            
            <p className='text-black  text-sm'>Already have an account? <Link to="/login" className='font-semibold'>  Log In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
