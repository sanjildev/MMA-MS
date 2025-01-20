import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/News.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleLoadLess = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const displayedNews = news.slice(0, currentPage * itemsPerPage);

  return (
    <div className="news-section">
      <h1>Latest News</h1>
      {displayedNews.map((item) => (
        <div key={item._id} className="news-card">
          {item.photo && <img src={item.photo} alt={item.title} className="news-thumbnail" />}
          <div className="news-content">
            <p className="news-date">{new Date(item.createdAt).toLocaleDateString()}</p>
            <h2 className="news-title">{item.title}</h2>
            <p>{item.content.substring(0, 100)}...</p>
          </div>
        </div>
      ))}
      <div className="pagination-buttons">
        {currentPage > 1 && (
          <button onClick={handleLoadLess} className="load-less">
            Load Less
          </button>
        )}
        {displayedNews.length < news.length && (
          <button onClick={handleLoadMore} className="load-more">
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default News;
