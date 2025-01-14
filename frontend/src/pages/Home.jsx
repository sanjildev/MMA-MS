import { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from '../components/Carousel';
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
          news.map((item) => (
            <div key={item._id} className="newsWrapper">
              {/* Image on one side */}
              {item.photo && (
                <div className="newsImage">
                  <img src={`    https://f7d8-2404-7c00-49-de05-a902-166b-adb4-c85b.ngrok-free.app/uploads/${item.photo}`} alt='photo not found' />
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
        
      </div>
      <div className="fightersDiv">
        <h3>Fighters</h3>
        <h1>Our Fighters</h1>
        <div className="mainWrapper">
        {fighters.length > 0 ? (
          fighters.map((fighter) => (
            
            <div key={fighter._id} className="fighterWrapper">
              {/* Image on one side */}
              {fighter.photo && (
                <div className="fighterImage">
                  <img src={`http://localhost:5000/${fighter.photo}`} alt='photo not found' />
                </div>
              )}
              {/* Content on the other side */}
              <div class="fighterOverlay">
              <div className="fighterContent">
                <h2>{fighter.name}</h2>
                <p><strong>Weight:</strong> {fighter.weight}</p>
                <p><strong>Record:</strong> {fighter.record}</p>
                {/* {fighter.bio && <p><strong>Bio:</strong> {fighter.bio}</p>} */}
              </div>
              </div>
            </div>
          ))
        ) : (
          <p>No fighters available</p>
        )}</div>
        <button className='moreFighters'>More fighters</button>
      </div>
    </div>
  );
};

export default Home;
