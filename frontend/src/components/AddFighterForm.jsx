// src/components/AddFighterForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AddFighterForm = () => {
  const [fighterData, setFighterData] = useState({ name: '', details: '' });

  const handleChange = (e) => {
    setFighterData({ ...fighterData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/fighters', fighterData)
      .then(response => console.log('Fighter added'))
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Fighter Name" onChange={handleChange} />
      <textarea name="details" placeholder="Details" onChange={handleChange}></textarea>
      <button type="submit">Add Fighter</button>
    </form>
  );
};

export default AddFighterForm;
