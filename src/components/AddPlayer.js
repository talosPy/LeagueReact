// AddPlayer.js
import React, { useState } from "react";

function AddPlayer() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const playerName = event.target["player-name"].value;
    const position = event.target["position"].value;
    const age = event.target["age"].value;
    const isInjured = event.target["is-injured"].value === "true";
    const clubId = event.target["club"].value;
    const access = localStorage.getItem("access_token");

    fetch("https://leagueproject.onrender.com/players/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      body: JSON.stringify({ player_name: playerName, position, age, is_injured: isInjured, club: clubId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.detail) {
          setSuccessMessage("");
          setErrorMessage(data.detail);
        } else {
          setErrorMessage("");
          setSuccessMessage("Player added successfully!");
          event.target.reset();
        }
      })
      .catch(() => {
        setErrorMessage("An error occurred while adding the player.");
        setSuccessMessage("");
      });
  };

  return (
    <div className="container mt-5">
      <h1>Add a New Player</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="player-name">Player Name</label>
          <input type="text" className="form-control" id="player-name" required />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position</label>
          <input type="text" className="form-control" id="position" required />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input type="number" className="form-control" id="age" required />
        </div>
        <div className="form-group">
          <label htmlFor="is-injured">Injured</label>
          <select className="form-control" id="is-injured" required>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="club">Club</label>
          <input type="number" className="form-control" id="club" required />
        </div>
        <button type="submit" className="btn btn-primary">Add Player</button>
      </form>
      {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
    </div>
  );
}

export default AddPlayer;
