// AddClub.js
import React, { useState } from "react";

function AddClub() {
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const clubName = event.target["club_name"].value;
    const city = event.target["city"].value;
    const stadium = event.target["stadium"].value;
    const coach = event.target["coach"].value;
    const isActive = event.target["is_active"].checked;
    const access = localStorage.getItem("access_token");

    fetch("https://leagueproject.onrender.com/clubs/add-club/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      body: JSON.stringify({ club_name: clubName, city, stadium, coach, is_active: isActive }),
    })
      .then((response) => response.json())
      .then(() => {
        setResponseMessage(<div className="alert alert-success">Club added successfully!</div>);
        event.target.reset();
      })
      .catch(() => {
        setResponseMessage(<div className="alert alert-danger">Error adding club.</div>);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Add New Club</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="club_name">Club Name</label>
          <input type="text" className="form-control" id="club_name" required />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type="text" className="form-control" id="city" required />
        </div>
        <div className="form-group">
          <label htmlFor="stadium">Stadium</label>
          <input type="text" className="form-control" id="stadium" required />
        </div>
        <div className="form-group">
          <label htmlFor="coach">Coach</label>
          <input type="text" className="form-control" id="coach" required />
        </div>
        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" id="is_active" />
          <label className="form-check-label" htmlFor="is_active">Is Active</label>
        </div>
        <button type="submit" className="btn btn-primary">Add Club</button>
      </form>
      {responseMessage && <div className="mt-3">{responseMessage}</div>}
    </div>
  );
}

export default AddClub;
