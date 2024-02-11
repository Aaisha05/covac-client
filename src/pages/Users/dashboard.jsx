// dashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SlotCard from './components/slotCard';
import SearchBar from './components/searchBar';
import DemoCarousel from './components/carouselComponent';
import { Link } from 'react-router-dom';

const UsersDashboard = () => {
  const [userSlotDetails, setUserSlotDetails] = useState([]);
  const [filteredSlotDetails, setFilteredSlotDetails] = useState([]);
  const slotCardsContainerRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:5000/user/slots')
      .then(res => {
        setUserSlotDetails(res.data);
        setFilteredSlotDetails(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSearch = (searchTerm) => {
    const filteredSlots = userSlotDetails.filter(
      (slot) => slot.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSlotDetails(filteredSlots);
    // Scroll to the slot cards container when searching
    slotCardsContainerRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookNow = (slotId) => {
    // Send a request to the backend to update the slot's capacity
    axios.post('http://localhost:5000/user/slots', { slotId })
      .then(res => {
        // Update the state with the new slot details
        setUserSlotDetails(res.data);
        setFilteredSlotDetails(res.data);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <div className='flex items-center justify-between bg-gray-100 p-4'>
        <h1 className='text-3xl font-bold  lg:text-5xl lg:font-semibold text-black'>co<span style={{ color: 'rgb(7, 90, 158)' }}>V</span>ac</h1>
        <Link to="/" className='text-white bg-black px-4 py-2 rounded'>Logout</Link>
      </div>

      <h1 className='lg:text-3xl md:text-2xl sm:text-2xl text-2xl font-semibold text-black mb-2 lg:mb-4 mt-6 pl-4 md:pl-8 lg:pl-12 sm:pl-4'>
        Welcome <span style={{ color: 'rgb(7, 90, 158)' }}>User!</span>
      </h1>

      <p className='text-base sm:text-base lg:text-lg text-black ml-3 lg:ml-4 mb-8 lg:mb-14 pl-2  md:pl-8 lg:pl-10 sm:pl-2'>
        Check for availability and book your slots now!
      </p>
      
      
      <SearchBar onSearch={handleSearch} />
      <DemoCarousel/>
      <h1 className='text-4xl lg:text-6xl text-center mb-10 lg:mb-20 text-black font-medium lg:font-semibold'>Your Slots</h1>
      <div className="container  mx-auto px-4" ref={slotCardsContainerRef}>
      <div className="container mx-auto px-4" ref={slotCardsContainerRef}>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4">
    {filteredSlotDetails.map((slot, index) => (
      <div key={index}>
        <SlotCard slot={slot} index={index} onBookNow={handleBookNow} />
      </div>
    ))}
  </div>
</div>
      </div>
    </div>
  );
};

export default UsersDashboard;





