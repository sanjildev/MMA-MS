import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Fighters() {
    const [fighters, setFighters] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/fighters') // Replace with your API URL
            .then((response) => setFighters(response.data))
            .catch((error) => console.error('Error fetching fighters:', error));
    }, []);

    return (
        <div>
            <h2>Fighters</h2>
            <ul>
                {fighters.map((fighter) => (
                   <> <li key={fighter.id}>{fighter.name}</li>
                    <li key={fighter.id}>{fighter.weight}</li>
                    <li key={fighter.id}>{fighter.record}</li>
                    <li key={fighter.id}>{fighter.bio}</li>
                    <li key={fighter.id}>{fighter.photo}</li>
                    </>
                ))}
            </ul>
        </div>
    );
}

export default Fighters;
