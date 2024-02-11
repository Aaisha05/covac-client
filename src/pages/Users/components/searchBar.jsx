import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './searchBar.css'

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Call the onSearch prop with the entered search term
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar  flex items-center justify-center mb-10 ">
      <input
        className='border border-gray-300 rounded-md py-2 px-4 lg:px-40 mr-2 focus:outline-none'
        placeholder="Search by location"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className='bg-blue-500 text-white px-4 py-2 rounded-md flex items-center' onClick={handleSearch}>
        <FaSearch className='mr-2 ' />
        Search
      </button>
    </div>
  );
};

export default SearchBar;
