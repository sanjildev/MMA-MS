import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Fighters.css';

const Fighters = () => {
  const [fighters, setFighters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchFighters = async () => {
      try {
        const response = await axios.get('/api/fighters'); // Replace with your API URL
        setFighters(response.data);
      } catch (error) {
        console.error('Error fetching fighters:', error.message);
      }
    };
    fetchFighters();
  }, []);

  const handleLoadMoreLess = (action) => {
    setCurrentPage((prevPage) =>
      action === 'more' ? prevPage + 1 : prevPage > 1 ? prevPage - 1 : 1
    );
  };

  const displayedFighters = fighters.slice(0, currentPage * itemsPerPage);

  return (
    <div className="fighter-section">
      <h1>Our Fighters</h1>
      <div className="fighter-row">
        {displayedFighters.map((fighter) => (
          <div key={fighter._id} className="fighter-card">
            {fighter.photo && <img src={fighter.photo} alt={fighter.name} className="fighter-thumbnail" />}
            <div className="fighter-content">
              <h2 className="fighter-name">{fighter.name}</h2>
              <p className="fighter-record">{fighter.record}</p>
              <p className="fighter-weight">{fighter.weight}</p>
              <p>{fighter.bio.substring(0, 100)}...</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-buttons">
        {currentPage > 1 && (
          <button
            onClick={() => handleLoadMoreLess('less')}
            className="loadless2"
          >
            Load Less
          </button>
        )}
        {displayedFighters.length < fighters.length && (
          <button
            onClick={() => handleLoadMoreLess('more')}
            className="loadmore1"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Fighters;
