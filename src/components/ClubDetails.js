import React, { useState, useEffect } from 'react';

function ClubDetails({ clubName }) {
  const [club, setClub] = useState(null);
  const [error, setError] = useState(null);
  const access = localStorage.getItem('access_token');

  useEffect(() => {
    if (!clubName) return;

    const apiUrl = `https://leagueproject.onrender.com/clubs/single/${clubName}/`;

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.detail) {
          setError(data.detail);
          setClub(null);
        } else {
          setClub(data);
          setError(null);
        }
      })
      .catch((error) => console.error('Error fetching club details:', error));
  }, [clubName, access]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      {club && (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">{club.club_name}</h5>
            <p><strong>City:</strong> {club.city}</p>
            <p><strong>Stadium:</strong> {club.stadium}</p>
            <p><strong>Coach:</strong> {club.coach}</p>
            <h6>Players:</h6>
            {club.players && club.players.length > 0 ? (
              club.players.map((player) => (
                <div key={player.name} className="card mt-2">
                  <div className="card-body">
                    <h5 className="card-title">{player.name}</h5>
                    <p><strong>Position:</strong> {player.position}</p>
                    <p><strong>Age:</strong> {player.age}</p>
                    <p><strong>Injured:</strong> {player.is_injured ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No players found for this club.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ClubDetails;
