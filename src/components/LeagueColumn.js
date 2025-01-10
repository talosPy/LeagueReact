import React from "react";

function LeagueColumn({ row }) {
  return (
    <tr>
      <td>{row.club}</td>
      <td>{row.wins}</td>
      <td>{row.losses}</td>
      <td>{row.draws}</td>
      <td>{row.goalsFor}</td>
      <td>{row.goalsAgainst}</td>
    </tr>
  );
}

export default LeagueColumn;
