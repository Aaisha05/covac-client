import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminDashboard from './pages/Admin/dashboard'; 
import UsersDashboard from './pages/Users/dashboard'; 
import Home1 from './pages/Main/home';
import Login from './pages/Main/login';
import Signup from './pages/Main/signup';
import ChatBot from './pages/Users/components/ChatBot';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />      
        <Route path="/users/dashboard" element={<UsersDashboard />} />      
        <Route path="/" element={<Home1 />} />   
        <Route path="/chat-bot" element={<ChatBot />} />      

        <Route path="/login" element={<Login />} />      
        <Route path="/signup" element={<Signup />} />      
      </Routes>
    </Router>
  );
}

export default App;