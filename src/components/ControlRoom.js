import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import LeagueTable from "./LeagueTable"

function ControlRoom({ isAuthenticated, setCurrentFixture, currentFixture }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false) // Added loading state for handling async process
  const [leagueTable, setLeagueTable] = useState([]) // Added state for the league table

  // Function to automate matches
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

  // Function to reset the league table
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
        setLeagueTable([]) // Set leagueTable to an empty array after reset

        alert("League table reset successfully!")
        navigate("/")
        setCurrentFixture(-1) // Fetch the updated league table after reset
      })
      .catch((error) => alert(error.message))
  }

  // Function to fetch the league table data
  function fetchLeagueTable() {
    fetch("https://leagueproject.onrender.com/matches/league/", {
      // Updated URL here
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setLeagueTable(data)) // Update the league table state
      .catch((error) => console.error("Failed to fetch league table", error))
  }

  // Fetch the league table on initial load
  useEffect(() => {
    if (isAuthenticated) {
      fetchLeagueTable()
    }
  }, [isAuthenticated])

  // Function to play a fixture
  function playFixture(fixtureNumber) {
    console.log("Playing fixture: ", fixtureNumber) // Debugging line

    setLoading(true) // Set loading state to true while making the request

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
        setLoading(false) // Reset loading state after request is done
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

          {/* Play Fixture Buttons */}
          <div className="d-flex justify-content-center">
            {Array.from({ length: 8 }).map((_, index) => (
              <button
                key={index}
                className="btn btn-success m-2"
                onClick={() => playFixture(index + 1)} // Correct fixture number passed here
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
