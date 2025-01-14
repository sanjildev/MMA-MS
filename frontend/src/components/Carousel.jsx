import React from 'react';
import Slider from 'react-slick';
import '../styles/Carousel.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
const Carousel = () => {
  useGSAP(()=>{
    gsap.from('.newsCarousel',{
      y:50,
      duration:1,
      delay:1,
      opacity:0
    }),
    gsap.from('.fightersCarousel',{
      y:50,
      duration:1,
      delay:4,
      opacity:0
    })
  })
  const settings = {
    infinite: true,       // Infinite loop
    speed: 500,           // Transition speed in ms
    slidesToShow: 1,      // Number of slides to show
    slidesToScroll: 1,    // Number of slides to scroll
    // autoplay: true,       // Enable autoplay
    // autoplaySpeed: 3000,  // Time between auto slides in ms
    arrows: true,         // Enable navigation arrows
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
       <div className="slide">
          <img src="/images/fighter1.png" alt="Slide 1" />
          <h1 className='newsCarousel'>Latest News</h1>
        <NavLink to="/news" className="carousel-btn1">News</NavLink>
        </div>
       <div className="slide">
          <img src="/images/fighter2.png" alt="Slide 2" />
          <h1 className='fightersCarousel'>Meet the Fighters</h1>
       <NavLink to="/fighters" className="carousel-btn2">Fighter</NavLink>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
