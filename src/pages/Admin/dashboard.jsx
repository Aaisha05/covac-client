import React, { useState, useEffect, useRef } from 'react';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';
import adminn from "./svg2.png";
//style={{ backgroundColor: 'rgb(226, 239, 250)' }} light blue

const Dashboard = () => {
  const [values, setValues] = useState({
    slotid: '',
    slotname: '',
    location: '',
    capacity: '',
    starttime: '',
    endtime: '',
    locationurl: '',
  });

  const [slotDetails, setSlotDetails] = useState([]);
  const [showDetailsTable, setShowDetailsTable] = useState(false);
  const showDetailsTableRef = useRef(null);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://covac-server-1.onrender.com/slots', values) //like this okk replace all the localhost with : https://covac-server.onrender.com localhost matuma ilana motha url ah
      .then(res => {
        console.log(res);
        if (res.data.data === 'okay') {
          alert('Submitted');
        } else {
          alert(`${res.data.sqlMessage}`);
        }
      })
      .catch(err => console.log(err));
  };

  const handleViewDetails = () => {
    axios.get('https://covac-server-1.onrender.com/slots')
      .then(res => {
        setSlotDetails(res.data);
        setShowDetailsTable(true);
      })
      .catch(err => console.log(err));
  };

  const handleLogout=()=>{
    localStorage.removeItem("admin");
    window.location.href="/";
  }

  const handleHideDetails = () => {
    setShowDetailsTable(false);
  };

  const handleDelete = (slotId) => {
    axios.delete(`https://covac-server-1.onrender.com/slots/${slotId}`)
      .then(res => {
        console.log(res);
        setSlotDetails(prevDetails => prevDetails.filter(slot => slot.slot_id !== slotId));
        alert('Slot deleted successfully');
      })
      .catch(err => console.log(err));
  };

  useEffect(()=>{
    const admin = localStorage.getItem("admin")
    if (!admin)
    {
      window.location.href = '/'
    }

  },[])

  useEffect(() => {
    if (showDetailsTable) {
      showDetailsTableRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showDetailsTable]);

  return (
    <div className="relative">
      <div className='flex items-center justify-between bg-gray-100 p-4'>
        <h1 className='text-3xl font-bold  lg:text-5xl lg:font-semibold text-black'>co<span style={{ color: 'rgb(7, 90, 158)' }}>V</span>ac</h1>
        <button onClick={handleLogout} className='text-white bg-black px-4 py-2 rounded'>Logout</button>
      </div>

      <h1 className='lg:text-3xl md:text-2xl sm:text-2xl text-2xl font-semibold text-black mb-2 lg:mb-4 mt-6 pl-4 md:pl-8 lg:pl-12 sm:pl-4'>
        Welcome <span style={{ color: 'rgb(7, 90, 158)' }}>Admin!</span>
      </h1>

      <p className='text-base sm:text-base lg:text-lg text-black ml-4 mb-14 pl-2  md:pl-8 lg:pl-10 sm:pl-2'>
        Enter the slot details by filling in the required fields.
      </p>
<div className='flex flex-col md:flex-row md:gap-x-4'>
  
        <form onSubmit={handleSubmit} className="lg:ml-15 max-w-md mx-auto sm:max-w-lg lg:max-w-3xl bg-white p-8 border border-gray-300 rounded mb-4 md:mb-0">
          <div className='mb-4 flex flex-wrap'>
            <div className='w-full lg:w-1/2 lg:pr-2'>
              <label className='text-gray-700'>Slot ID:</label>
              <input
                className='input1 border border-gray-300 p-2 rounded w-full'
                type="text"
                name="slotid"
                onChange={handleChange}
              />
            </div>
            <div className='w-full lg:w-1/2 lg:pl-2'>
              <label className='text-gray-700'>Slot Name:</label>
              <input
                className='input1 border border-gray-300 p-2 rounded w-full'
                type="text"
                name="slotname"
                onChange={handleChange}
              />
            </div>
          </div>
  
          <div className='mb-4 flex flex-wrap'>
            <div className='w-full lg:w-1/2 lg:pr-2'>
              <label className='text-gray-700'>Location:</label>
              <input
                className='input1 border border-gray-300 p-2 rounded w-full'
                type="text"
                name="location"
                onChange={handleChange}
              />
            </div>
            <div className='w-full lg:w-1/2 lg:pl-2'>
              <label className='text-gray-700'>Capacity:</label>
              <input
                className='input1 border border-gray-300 p-2 rounded w-full'
                type="number"
                name="capacity"
                onChange={handleChange}
              />
            </div>
          </div>
  
          <div className='mb-4 flex flex-wrap'>
            <div className='w-full lg:w-1/2 lg:pr-2'>
              <label className='text-gray-700'>Start Time:</label>
              <input
                className='input1 border border-gray-300 p-2 rounded w-full'
                type="time"
                name="starttime"
                onChange={handleChange}
              />
            </div>
            <div className='w-full lg:w-1/2 lg:pl-2'>
              <label className='text-gray-700'>End Time:</label>
              <input
                className='input1 border border-gray-300 p-2 rounded w-full'
                type="time"
                name="endtime"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='w-full mb-4 lg:pl-1 '>
    <label className='text-gray-700'>Location URL:</label>
    <input
      className='input1 border border-gray-300 p-2 rounded w-full'
      type="text"
      name="locationurl"
      onChange={handleChange}
    />
  </div>
  
          <div className=' flex justify-center'>
            <button className='sub bg-black text-white py-2 px-4 rounded w-80 mt-4' type='submit'>Submit</button>
          </div>
        </form>
  
        {/* Right side box */}
        <div className="right_box lg:mr-60 p-8  rounded mb-4 md:ml-0 md:mt-4">
          <div className="mb-2">
          <h1 className='font-semibold text-2xl lg:text-4xl text-black mb-2 lg:mb-4' >View other slot details</h1>
          <p className="text-gray-700 text-normal lg:text-lg mb-4">Click this to view and edit all the previous slot details.</p>
          <button className='text-white bg-black px-4 py-2 rounded mt-4'style={{ backgroundColor: 'rgb(7, 90, 158)' }} onClick={handleViewDetails}>View all Slot Details</button>
          </div>
        </div>
</div>


      {/* Slot details table */}
      <div className="lg:mx-60 lg:mt-32">
  <div ref={showDetailsTableRef} className={` ${showDetailsTable ? 'view' : 'view hidden'}`}>
    {showDetailsTable && (
      <div>
        <h2 className='text-center text-2xl lg:text-3xl font-semibold mb-8 lg:mb-12 mt-6' >Previous Slot Details:</h2>
        <div className="overflow-x-auto">
          <table className='w-full mb-4 table-auto border-collapse'>
            <thead>
            <tr className="bg-black text-white">
                <th className="border font-normal border-gray-300 px-4 py-4">Slot ID</th>
                <th className="border font-normal border-gray-300 px-4 py-4">Slot Name</th>
                <th className="border font-normal border-gray-300 px-4 py-4">Location</th>
                <th className="border font-normal border-gray-300 px-4 py-4">Capacity</th>
                <th className="border font-normal border-gray-300 px-4 py-4">Start Time</th>
                <th className="border font-normal border-gray-300 px-4 py-4">End Time</th>
                <th className="border font-normal border-gray-300 px-4 py-4">Delete slot</th>
              </tr>
            </thead>
            <tbody>
            {slotDetails.map((slot, index) => (
                <tr key={index} className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">{slot.slot_id}</td>
                  <td className="border border-gray-300 px-4 py-2">{slot.slot_name}</td>
                  <td className="border border-gray-300 px-4 py-2">{slot.location}</td>
                  <td className="border border-gray-300 px-4 py-2">{slot.capacity}</td>
                  <td className="border border-gray-300 px-4 py-2">{slot.start_time}</td>
                  <td className="border border-gray-300 px-4 py-2">{slot.end_time}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="delete-button" onClick={() => handleDelete(slot.slot_id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showDetailsTable && (
          <div className="flex justify-center">
            <button className='text-white bg-black px-4 py-2 rounded mt-8 lg:mt-4 mb-40' onClick={handleHideDetails}>Hide details</button>
          </div>
        )}
      </div>
    )}
  </div>
</div>
    </div>
  );
};

export default Dashboard;

