// CarouselComponent.jsx
import React, { useState, useEffect } from 'react';
import img1 from './image1.jpg';
import img2 from './image2.jpg';
import img3 from './image3.avif';
import './carouselComponent.css'

const items = [
  {
    id: 1,
    imageUrl: img1,
    title: 'Check availability',
    description: 'Check for availability and choose your desired vaccination centre and book your slots to get vaccinated.',
  },
  {
    id: 2,
    imageUrl: img2,
    title: 'Stay Healthy',
    description: 'Eat healthy ! Stay healthy! Health is all we need to take care of!',
  },
  {
    id: 3,
    imageUrl: img3,
    title: 'Get vaccinated',
    description: "Through coVac make your vaccination procedure easier and you'd be ready to fight Covid! ",
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
    <div className="carousel-container w-4/5 h-4/5 screen flex items-center justify-center">
      <div className="carousel w-full h-full flex items-center justify-center">
        <div className="carousel-item w-full h-full text-center">
          <img
            className="object-cover w-full h-full"
            src={items[currentItem].imageUrl}
            alt={items[currentItem].title}
          />
          <h2 className="text-3xl md:text-4xl lg:text-5xl mt-6">{items[currentItem].title}</h2>
          <p className="text-lg md:text-xl lg:text-2xl mt-4">{items[currentItem].description}</p>
        </div>
      </div>
    </div>
  );
};

export default DemoCarousel;


