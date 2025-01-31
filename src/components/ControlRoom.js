import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import LeagueTable from "./LeagueTable"

function ControlRoom({ isAuthenticated, setCurrentFixture, currentFixture }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false) 
  const [leagueTable, setLeagueTable] = useState([]) 

  function automateMatches() {
    fetch("https://leagueproject.onrender.com/matches/automate/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Matches already generated.")
        alert("Matches automated successfully!")
      })
      .catch((error) => alert(error.message))
  }

  function resetLeagueTable() {
    fetch("https://leagueproject.onrender.com/matches/reset/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to reset league table.")
        setLeagueTable([]) 

        alert("League table reset successfully!")
        navigate("/")
        setCurrentFixture(-1) 
      })
      .catch((error) => alert(error.message))
  }

  function fetchLeagueTable() {
    fetch("https://leagueproject.onrender.com/matches/league/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setLeagueTable(data)) 
      .catch((error) => console.error("Failed to fetch league table", error))
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeagueTable()
    }
  }, [isAuthenticated])

  
  function playFixture(fixtureNumber) {
    console.log("Playing fixture: ", fixtureNumber) 

    setLoading(true) 

    fetch(
      `https://leagueproject.onrender.com/matches/play-fixture/${fixtureNumber}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok)
          throw new Error(`Error playing fixture ${fixtureNumber}.`)

        setCurrentFixture(fixtureNumber)
        alert(`Fixture ${fixtureNumber} played successfully!`)
      })
      .catch((error) => alert(error.message))
      .finally(() => {
        setLoading(false) 
      })
  }

  return (
    <div className="control-room text-center">
      {isAuthenticated ? (
        <>
          <button className="btn btn-primary m-2" onClick={automateMatches}>
            Automate Matches
          </button>
          <button className="btn btn-warning m-2" onClick={resetLeagueTable}>
            Reset League Table
          </button>

          
          <div className="d-flex justify-content-center">
            {Array.from({ length: 8 }).map((_, index) => (
              <button
                key={index}
                className="btn btn-success m-2"
                onClick={() => playFixture(index + 1)} 
                disabled={loading}
              >
                {loading ? "Loading..." : `Fixture ${index + 1}`}
              </button>
            ))}
          </div>

          {/* Display the league table */}
          {/* <div className="league-table mt-4">
            <table className="table table-bordered">
              <tbody>
                {leagueTable.map((team, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{team.club_name}</td>
                    <td>{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
          {/* <LeagueTable leagueData={leagueTable}/> */}
        </>
      ) : (
        <p>Please log in to access the control room.</p>
      )}
    </div>
  )
}

export default ControlRoom
