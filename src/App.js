import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import ControlRoom from "./components/ControlRoom"
import LeagueTable from "./components/LeagueTable"
import AuthForm from "./components/AuthForm"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import HowTo from "./components/HowTo"
import ClubList from "./components/ClubList" 
import ClubDetails from "./components/ClubDetails" 
import AddPlayer from "./components/AddPlayer"
import AddClub from "./components/AddClub"
import { useLogin } from "./LoginContext"

function App() {
  const [leagueData, setLeagueData] = useState([])
  const [currentFixture, setCurrentFixture] = useState(0)
  const [selectedClub, setSelectedClub] = useState(null) 
  const { isAuthenticated, logout } = useLogin()

  const fetchLeagueData = async () => {
    try {
      const response = await fetch(
        "https://leagueproject.onrender.com/matches/league/"
      )
      if (!response.ok) throw new Error("Failed to fetch league data.")
      const data = await response.json()
      setLeagueData(data)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchLeagueData()
  }, [currentFixture])

  const handleSelectClub = (clubName) => {
    setSelectedClub(clubName)
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ControlRoom
                  isAuthenticated={isAuthenticated}
                  setCurrentFixture={setCurrentFixture}
                  currentFixture={currentFixture}
                />
                <LeagueTable leagueData={leagueData} />
              </>
            }
          />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/howto" element={<HowTo />} />
          <Route
            path="/clubs"
            element={
              <div className="container my-5">
                <ClubList onSelectClub={handleSelectClub} />
                <ClubDetails clubName={selectedClub} />
              </div>
            }
          />
          <Route
            path="/add-assets"
            element={
              <div className="container my-5">
                <h1>Add Assets</h1>
                <AddClub />
                <AddPlayer />
              </div>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
