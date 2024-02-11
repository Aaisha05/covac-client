// CarouselComponent.jsx
import React, { useState, useEffect } from 'react';
import img1 from './org1.png';
import img2 from './org2.png';
import img3 from './org3.png';
import './carouselComponent.css'

const items = [
  {
    id: 1,
    imageUrl: img1,
    title:  'Stay Healthy',
    description:'Eat healthy ! Stay healthy! Health is all we need to take care of, for without it we cannot lead a peaceful life.',
  },
  {
    id: 2,
    imageUrl: img2,
    title:  'Get vaccinated',
    description: "Through coVac make your vaccination procedure easier and you'd be ready to fight Covid! ",
  },
  {
    id: 3,
    imageUrl: img3,
    title: 'Check availability',
    description: 'Check for availability and choose your desired vaccination centre and book your slots.',
  },
];

const DemoCarousel = () => {
  const [currentItem, setCurrentItem] = useState(0);

  function nextItem() {
    if (currentItem === items.length - 1) {
      setCurrentItem(0);
    } else {
      setCurrentItem((curr) => curr + 1);
    }
  }

  function prevItem() {
    if (currentItem === 0) {
      setCurrentItem(items.length - 1);
    } else {
      setCurrentItem((curr) => curr - 1);
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextItem();
    }, 3000);
    return () => clearInterval(timer);
  }, [currentItem]);

  return (
    <div className="carousel-container screen flex  lg:ml-40 ">
      <div className="carousel w-full h-full flex items-center justify-center">
        <div className="carousel-item w-full h-full text-center">
          <img
            className="object-cover w-full h-full"
            src={items[currentItem].imageUrl}
            alt={items[currentItem].title}
          />
          <h2 className="text-xl md:text-3xl lg:text-4xl mt-3 lg:mt-6 font-semibold lg:font-medium text-left ml-5 lg:ml-40 ">{items[currentItem].title}</h2>
          <p className="text-normal  md:text-md lg:text-lg mb-20 mt-4 text-left ml-5 lg:ml-40">{items[currentItem].description}</p>
        </div>
      </div>
    </div>
  );
};

export default DemoCarousel;


