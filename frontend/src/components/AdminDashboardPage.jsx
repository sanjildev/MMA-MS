import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboardPage.css';

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
};

const AdminDashboardPage = () => {
  const [news, setNews] = useState([]);
  const [fighters, setFighters] = useState([]);
  const [newsForm, setNewsForm] = useState({ title: '', content: '', photo: null });
  const [fighterForm, setFighterForm] = useState({ name: '', weight: '', record: '', bio: '', photo: null });
  const [editNewsId, setEditNewsId] = useState(null);
  const [editFighterId, setEditFighterId] = useState(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isFighterModalOpen, setIsFighterModalOpen] = useState(false);

  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  useEffect(() => {
    // Fetch News
    axios.get('/api/news', config)
      .then(response => setNews(response.data))
      .catch(error => console.error('Error fetching news:', error));

    // Fetch Fighters
    axios.get('/api/fighters', config)
      .then(response => setFighters(response.data))
      .catch(error => console.error('Error fetching fighters:', error));
  }, []);

  // Handle News Form Changes
  const handleNewsChange = (e) => {
    setNewsForm({
      ...newsForm,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Fighter Form Changes
  const handleFighterChange = (e) => {
    setFighterForm({
      ...fighterForm,
      [e.target.name]: e.target.value,
    });
  };

  // Handle File Uploads
  const handleFileChange = (e, type) => {
    if (type === 'news') {
      setNewsForm({
        ...newsForm,
        photo: e.target.files[0],
      });
    } else if (type === 'fighter') {
      setFighterForm({
        ...fighterForm,
        photo: e.target.files[0],
      });
    }
  };

  // Add or Edit News
  const handleSaveNews = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newsForm.title);
    formData.append('content', newsForm.content);
    if (newsForm.photo) formData.append('photo', newsForm.photo);
  
    try {
      if (editNewsId) {
        // Edit existing news
        const response = await axios.put(`/api/news/${editNewsId}`, formData, config);
        setNews(news.map(item => (item._id === editNewsId ? response.data : item)));
        setEditNewsId(null);
      } else {
        // Add new news
        const response = await axios.post('/api/news', formData, config);
        setNews([...news, response.data]);
      }
      setNewsForm({ title: '', content: '', photo: null });
      setIsNewsModalOpen(false);
    } catch (error) {
      console.error('Error saving news:', error);
    }
  };
  
  // Add or Edit Fighter
  const handleSaveFighter = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', fighterForm.name);
    formData.append('weight', fighterForm.weight);
    formData.append('record', fighterForm.record);
    formData.append('bio', fighterForm.bio);
    if (fighterForm.photo) formData.append('photo', fighterForm.photo);

    try {
      if (editFighterId) {
        // Edit existing fighter
        await axios.put(`/api/fighters/${editFighterId}`, formData, config);
        setFighters(fighters.map(item => (item._id === editFighterId ? { ...item, ...fighterForm } : item)));
        setEditFighterId(null);
      } else {
        // Add new fighter
        const response = await axios.post('/api/fighters', formData, config);
        setFighters([...fighters, response.data]);
      }
      setFighterForm({ name: '', weight: '', record: '', bio: '', photo: null });
      setIsFighterModalOpen(false);
    } catch (error) {
      console.error('Error saving fighter:', error);
    }
  };

  // Delete News
  const handleDeleteNews = async (id) => {
    try {
      await axios.delete(`/api/news/${id}`, config);
      setNews(news.filter(newsItem => newsItem._id !== id));
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  // Delete Fighter
  const handleDeleteFighter = async (id) => {
    try {
      await axios.delete(`/api/fighters/${id}`, config);
      setFighters(fighters.filter(fighter => fighter._id !== id));
    } catch (error) {
      console.error('Error deleting fighter:', error);
    }
  };

  // Start Editing News
  const handleEditNews = (newsItem) => {
    setEditNewsId(newsItem._id);
    setNewsForm({ title: newsItem.title, content: newsItem.content, photo: null });
    setIsNewsModalOpen(true);
  };

  // Start Editing Fighter
  const handleEditFighter = (fighter) => {
    setEditFighterId(fighter._id);
    setFighterForm({ name: fighter.name, weight: fighter.weight, record: fighter.record, bio: fighter.bio, photo: null });
    setIsFighterModalOpen(true);
  };

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <button onClick={handleLogout} className="logout-button">Logout</button>

      {/* News Section */}
      <button onClick={() => setIsNewsModalOpen(true)} className='addNewsFighter'>Add News</button>
      <div className="news-section">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.map((newsItem) => (
              <tr key={newsItem._id}>
                <td>{newsItem.title}</td>
                <td>{newsItem.content}</td>
                <td>{newsItem.photo && <img src={newsItem.photo} alt={newsItem.title} style={{ width: '100px',height:'80px' }} />}</td>
                <td>
                  <button onClick={() => handleEditNews(newsItem)} className='newsEdit'>Edit</button>
                  <button onClick={() => handleDeleteNews(newsItem._id)} className='newsDel'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fighters Section */}
      <button onClick={() => setIsFighterModalOpen(true)} className='addNewsFighter'>Add Fighter</button>
      <div className="fighters-section">
        <table>
          <thead>
            <tr>
              <th>Fighter Name</th>
              <th>Record</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fighters.map((fighter) => (
              <tr key={fighter._id}>
                <td>{fighter.name}</td>
                <td>{fighter.record}</td>
                <td>{fighter.photo && <img src={fighter.photo} alt={fighter.name} style={{ width: '140px',height:'140px',marginLeft:'4rem',objectFit:'cover' }} />}</td>
                <td>
                  <button onClick={() => handleEditFighter(fighter)} className='fighterEdit'>Edit</button>
                  <button onClick={() => handleDeleteFighter(fighter._id)} className='fighterDel'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding/Editing News */}
      <Modal isOpen={isNewsModalOpen} onClose={() => setIsNewsModalOpen(false)}>
        <h2>{editNewsId ? 'Edit News' : 'Add News'}</h2>
        <form onSubmit={handleSaveNews}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newsForm.title}
            onChange={handleNewsChange}
          />
          <textarea
            name="content"
            placeholder="Content"
            value={newsForm.content}
            onChange={handleNewsChange}
          />
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'news')}
          />
          <button type="submit" className='buttonNews'>{editNewsId ? 'Update News' : 'Add News'} </button>
        </form>
      </Modal>

      {/* Modal for Adding/Editing Fighters */}
      <Modal isOpen={isFighterModalOpen} onClose={() => setIsFighterModalOpen(false)}>
        <h2>{editFighterId ? 'Edit Fighter' : 'Add Fighter'}</h2>
        <form onSubmit={handleSaveFighter}>
          <input
            type="text"
            name="name"
            placeholder="Fighter Name"
            value={fighterForm.name}
            onChange={handleFighterChange}
          />
          <input
            type="text"
            name="weight"
            placeholder="Weight"
            value={fighterForm.weight}
            onChange={handleFighterChange}
          />
          <input
            type="text"
            name="record"
            placeholder="Record"
            value={fighterForm.record}
            onChange={handleFighterChange}
          />
          <textarea
            name="bio"
            placeholder="Bio"
            value={fighterForm.bio}
            onChange={handleFighterChange}
          />
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'fighter')}
          />
          <button type="submit" className='buttonFighter'>{editFighterId ? 'Update Fighter' : 'Add Fighter'}</button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminDashboardPage;
