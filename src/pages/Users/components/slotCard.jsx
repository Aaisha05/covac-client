// slotCard.jsx
import React, { useState } from 'react';
import image5 from './image5.png'; // Import your standard image here

const SlotCard = ({ slot, index, onBookNow }) => {
  const [bookingMessage, setBookingMessage] = useState('');

  const handleBookNow = async () => {
    try {
      await onBookNow(slot.slot_id);
      setBookingMessage('Successfully booked!');
      setTimeout(() => setBookingMessage(''), 2000);
    } catch (error) {
      console.error('Booking error:', error);
      // Handle booking error if needed
    }
  };

  return (
    <div className="slot-card bg-white border border-gray-300 rounded-lg shadow-md p-6 mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4">
      <div className="mb-4">
        <img src={image5} alt={`Slot ${index}`} className="w-full h-auto mb-4" /> {/* Updated alt attribute */}
        <h3 className="text-center text-xl font-semibold">Slot ID: {slot.slot_id}</h3>
      </div>
      <p className="mb-2"><span className="font-semibold">Slot Name:</span> {slot.slot_name}</p>
      <p className="mb-2"><span className="font-semibold">Location:</span> {slot.location}</p>
      <p className="mb-2"><span className="font-semibold">Capacity:</span> {slot.capacity}</p>
      <p className="mb-2"><span className="font-semibold">Start Time:</span> {slot.start_time}</p>
      <p className="mb-2"><span className="font-semibold">End Time:</span> {slot.end_time}</p>
      {slot.capacity === 0 && <p className="full-slott bg-red-500 text-white font-semibold px-2 py-1 rounded-full absolute top-0 right-0">Full</p>}
      <button className='book-now-button bg-blue-500 text-white px-4 py-2 rounded-full mt-4 block mx-auto' onClick={handleBookNow}>Book now</button>
      {bookingMessage && <p className="booking-message text-green-500 font-semibold text-center mt-2">{bookingMessage}</p>}
    </div>
  );
};

export default SlotCard;





