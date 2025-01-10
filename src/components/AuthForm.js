import React, { useState } from "react"

function AuthForm() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("") // Used for registration
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("") // Display success/error messages
  
  async function handleLogin(e) {
    e.preventDefault()

    try {
      const response = await fetch(
        "https://leagueproject.onrender.com/users/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      )

      const data = await response.json()
      console.log("API response data:", data) // Log the response

      if (response.ok) {
        const { access, refresh, username, isAdmin } = data // Use lowercase "username"
        console.log(data)
        // Store in localStorage
        localStorage.setItem("access_token", access)
        localStorage.setItem("refresh_token", refresh)
        console.log(username)
        localStorage.setItem("username", username) // Store lowercase "username"
        localStorage.setItem("isAdmin", isAdmin) // Store "isAdmin"

        setMessage("Login successful! Redirecting...")
        setTimeout(() => {
          window.location.href = "/" // Redirect after login
        }, 1000)
      } else {
        setMessage(data.detail || "An error occurred. Please try again.")
      }
    } catch (error) {
      console.error("Error:", error)
      setMessage("An error occurred. Please try again.")
    }
  }

  async function handleRegister(e) {
    e.preventDefault()

    try {
      const response = await fetch(
        "https://leagueproject.onrender.com/users/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      )

      const data = await response.json()

      if (response.ok) {
        setMessage("Registration successful! You can now log in.")
        setUsername("")
        setEmail("")
        setPassword("")
      } else {
        setMessage(data.detail || "An error occurred. Please try again.")
      }
    } catch (error) {
      console.error("Error:", error)
      setMessage("An error occurred. Please try again.")
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login or Register</h2>
      {message && (
        <div
          className={`alert ${
            message.includes("successful") ? "alert-success" : "alert-danger"
          }`}
        >
          {message}
        </div>
      )}
      <form className="mt-4">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email (only for registration)</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-between mt-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  )
}

export default AuthForm
