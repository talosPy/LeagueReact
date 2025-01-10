import React, { useState, useEffect } from 'react';

function ClubList({ onSelectClub }) {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);  // Add loading state
  const [error, setError] = useState(null);
  const access = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch('https://leagueproject.onrender.com/clubs/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch clubs');
        }

        const data = await response.json();
        setClubs(data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError(err.message);  // Set error if any occurs
        setLoading(false);  // Stop loading even if there's an error
      }
    };

    fetchClubs();
  }, [access]);

  if (loading) {
    return <div>Loading...</div>;  // Show loading message
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;  // Show error message
  }

  return (
    <div>
      <h2 className="text-center">All Clubs</h2>
      <ul className="list-group mt-4">
        {clubs.map((club) => (
          <li
            key={club.club_name}
            className="list-group-item"
            onClick={() => onSelectClub(club.club_name)}
            style={{ cursor: 'pointer' }}
          >
            <strong>{club.club_name}</strong> - {club.city}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClubList;
