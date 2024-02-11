import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Svg2 from './svg2.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://192.168.1.11:5000/login', values)
      .then((res) => {
        if (res.data.message === 'Login successful') {
          alert('Logged in successfully');
          
          // Redirect based on the response
          if (res.data.redirect === '/admin/dashboard') {
            navigate('/admin/dashboard'); // Redirect to Admin Dashboard
          } else if (res.data.redirect === '/users/dashboard') {
            navigate('/users/dashboard');
          } else {
            navigate('/'); // Redirect to a default route if needed
          }
        } else {
          alert('Invalid credentials');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Invalid credentials');
      });
  };

  return (
    <div className='flex flex-col sm:flex-row h-screen'>

      {/* Left half - Display only on screens larger than small */}
      <div className="hidden sm:flex sm:flex-1 sm:bg-white sm:flex-col sm:justify-center sm:items-center">
        <h1 className='font-semibold text-8xl mb-4 relative'>co<span style={{ color: 'rgb(7, 90, 158)' }}>V</span>ac</h1>
        <p className='text-center text-lg mt-4 mb-10' style={{ color: 'rgb(7, 90, 158)' }}>The ultimate site to check the availability and book your <br/> Covid Vaccination slots!</p>
        <img className='h-72 w-auto mb-8' src={Svg2} alt="SVG Image" />
      </div>

      {/* Right half - Display on all screens */}
      <div className="flex-1 flex justify-center items-center"style={{ backgroundColor: 'rgb(226, 239, 250)' }}>
        <div className='bg-white w-80 p-8 rounded-lg'>
          <h1 className='text-2xl font-bold text-center mb-4'>Login</h1>
          <form onSubmit={handleSubmit} id="loginForm">
            <label>Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              required
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
              onChange={handleChange}
            />
            <label>Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              className="w-full px-3 py-2 mb-6 border border-gray-300 rounded"
              onChange={handleChange}
            />
            <div className='flex justify-center'>
              <button type="submit" className="bg-blue-500 text-white w-40 py-2 rounded">
                Log In
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            
            <p className='text-black  text-sm'>Don't have an account? <Link to="/signup" className='font-semibold'> Sign Up</Link></p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;

