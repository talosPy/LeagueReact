import React from "react";

function LeagueTable({ leagueData }) {
  // Log leagueData to inspect its structure
  console.log("League Data:", leagueData);

  // Check if leagueData is an array and has items
  if (!Array.isArray(leagueData) || leagueData.length === 0) {
    return <p>No league data available.</p>;
  }

  return (
    <div className="league-table">
      <h3>League Table</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Team</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Draws</th>
            <th>Goals For</th>
            <th>Goals Against</th>
          </tr>
        </thead>
        <tbody>
          {leagueData.map((team, index) => {
            // Log each team to inspect its structure
            console.log("Team data:", team);

            // Check if team and team.club_name exist
            if (team && team.club_name && team.wins !== undefined) {
              return (
                <tr key={index}>
                  <td>{team.club_name}</td>
                  <td>{team.wins}</td>
                  <td>{team.losses}</td>
                  <td>{team.draws}</td>
                  <td>{team.goals_for}</td>
                  <td>{team.goals_against}</td>
                </tr>
              );
            } else {
              return (
                <tr key={index}>
                  <td colSpan="6">Invalid team data</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
}

export default LeagueTable;
