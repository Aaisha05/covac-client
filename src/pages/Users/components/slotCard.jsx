import React, { useState, useEffect } from 'react';
import image5 from './image5.png'; // Import your standard image here
import './slotCard.css';

const SlotCard = ({ slot, index, onBookNow }) => {
  const [bookingStatus, setBookingStatus] = useState('Not Booked'); // Default to 'Not Booked'
  const [isSlotBooked, setIsSlotBooked] = useState(() => {
    // Retrieve booking status from local storage if available
    return localStorage.getItem(`isSlotBooked-${slot.slot_id}`) === 'true' || false;
  });

  useEffect(() => {
    // Update local storage when booking status changes
    localStorage.setItem(`isSlotBooked-${slot.slot_id}`, isSlotBooked);
  }, [isSlotBooked, slot.slot_id]);

  const handleBookNow = async () => {
    try {
      if (slot.capacity === 0) {
        setBookingStatus('Cannot book');
      } else {
        await onBookNow(slot.slot_id);
        setBookingStatus('Booked');
        setIsSlotBooked(true);
      }
    } catch (error) {
      console.error('Booking error:', error);
      // Handle booking error if needed
    }
  };

  return (
    <div className="slot-card bg-white border border-gray-300 rounded-lg shadow-md p-6 mb-4 w-full sm:w-full md:w-full lg:w-full xl:w-[20rem] xl:h-[35rem] relative">
      {slot.capacity === 0 && <p className="slot-full-message absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-md">Full</p>}
      <div className="mb-4">
        <img src={image5} alt={`Slot ${index}`} className="w-full h-auto mb-4" /> {/* Updated alt attribute */}
        <h3 className="text-center text-xl font-semibold">Slot ID: {slot.slot_id}</h3>
      </div>
      <p className="mb-2"><span className="font-semibold">Slot Name:</span> {slot.slot_name}</p>
      <p className="mb-2"><span className="font-semibold">Location:</span> {slot.location}</p>
      <p className="mb-2"><span className="font-semibold">Capacity:</span> {slot.capacity}</p>
      <p className="mb-2"><span className="font-semibold">Start Time:</span> {slot.start_time}</p>
      <p className="mb-2"><span className="font-semibold">End Time:</span> {slot.end_time}</p>
      <p className="mb-2"><span className="font-semibold">Booking Status:</span> 
        <span className={bookingStatus === 'Booked' ? 'text-green-500 font-semibold lg:ml-2' : ''}>{bookingStatus}</span>
      </p>

      {slot.capacity !== 0 && ( // Render the button if capacity is not zero
        <div className="button-container absolute bottom-4 left-0 w-full text-center">
          <button className='book-now-button bg-blue-500 text-white px-4 py-2 rounded-full inline-block' onClick={handleBookNow}>Book now</button>
        </div>
      )}
    </div>
  );
};

export default SlotCard;

















