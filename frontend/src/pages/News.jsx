import { useEffect, useState } from 'react';
import axios from 'axios';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('/api/news');
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error.message);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="news-page">
      <h1>Latest News</h1>
      {news.length > 0 ? (
        news.map((item) => (
          <div key={item._id}>
            <h2>{item.title}</h2>
            <p>{item.content}</p>
          </div>
        ))
      ) : (
        <p>No news available</p>
      )}
    </div>
  );
};

export default News;
