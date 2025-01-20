import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from '../components/Carousel';
import { NavLink } from 'react-router-dom'; // Import NavLink
import '../styles/Home.css';

const Home = () => {
  const [news, setNews] = useState([]);
  const [fighters, setFighters] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('/api/news');
        setNews(response.data); // Set the fetched news data
      } catch (error) {
        console.error('Error fetching news:', error.message);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    const fetchFighters = async () => {
      try {
        const response = await axios.get('/api/fighters');
        setFighters(response.data);
      } catch (error) {
        console.error('Error fetching fighters:', error.message);
      }
    };
    fetchFighters();
  }, []);

  return (
    <div>
      <div className="carousel-img">
        <Carousel />
      </div>
      <div className="newsDiv">
        <h3>Updates</h3>
        <h1>Latest News</h1>
        <img src="/images/right.png" alt="" className='bgNepal' />
        {news.length > 0 ? (
          news.slice(0, 3).map((item) => (  // Display only the first 3 news items
            <div key={item._id} className="newsWrapper">
              {/* Image on one side */}
              {item.photo && (
                <div className="newsImage">
                  <img src={item.photo} alt='photo not found' className='newsImg'/>
                </div>
              )}
              {/* Content on the other side */}
              <div className="newsContent">
                <p className="newsDate">{new Date(item.createdAt).toLocaleDateString()}</p>
                <h2>{item.title}</h2>
                <p>{item.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No news available</p>
        )}
        <NavLink to="/news">
          <button className='moreNews'>More news</button>
        </NavLink>
      </div>

      <div className="fightersDiv">
        <h3>Fighters</h3>
        <h1>Our Fighters</h1>
        <div className="mainWrapper">
          {fighters.length > 0 ? (
            fighters.slice(0, 3).map((fighter) => (  // Display only the first 3 fighters
              <div key={fighter._id} className="fighterWrapper">
                {/* Image on one side */}
                {fighter.photo && (
                  <div className="fighterImage">
                    <img src={fighter.photo} alt='photo not found' />
                  </div>
                )}
                {/* Content on the other side */}
                <div className="fighterOverlay">
                  <div className="fighterContent">
                    <h2>{fighter.name}</h2>
                    <p><strong>Weight:</strong> {fighter.weight}</p>
                    <p><strong>Record:</strong> {fighter.record}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No fighters available</p>
          )}
        </div>
        <NavLink to="/fighters">
          <button className='moreFighters'>More fighters</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
