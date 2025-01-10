import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Ensure the import is correct

function Navbar() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(""); // For storing the username
  const [isAdmin, setIsAdmin] = useState(false); // For storing the isAdmin status
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const storedUsername = localStorage.getItem("username"); // Get username
    const storedIsAdmin = localStorage.getItem("isAdmin"); // Get isAdmin (as string)

    if (accessToken) {
      const decoded = jwtDecode(accessToken); // Decode the JWT token if needed

      // If username and isAdmin are in localStorage, use those
      setUsername(storedUsername);
      setIsAdmin(storedIsAdmin === "true"); // Convert string "true" to boolean

      setUser(decoded); // If the token is valid, store user data in the state
    }
  }, []);

  const handleLogout = () => {
    // Remove the access token and refresh token from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    localStorage.removeItem("isAdmin");

    // Clear the user state
    setUser(null);
    setUsername("");
    setIsAdmin(false);

    // Use a small delay before navigating to the login page to ensure the state is cleared
    setTimeout(() => {
      navigate("/auth"); // This will navigate to the login page
    }, 200); // Optional delay, you can adjust the time if needed
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Talos's League
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                League
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/clubs">
                Clubs
              </Link>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    Hello, {username} ({isAdmin ? "Admin" : "User"})
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/auth">
                  Login
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/howto">
                How To Play
              </Link>
            </li>
            {isAdmin && (
              <li className="nav-item" style={{ color: "blue", fontWeight: "bold", textDecoration: "none" }}>
                <Link className="nav-link" to="/add-assets">
                  Add Assets
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
