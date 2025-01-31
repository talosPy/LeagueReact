import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 

function Navbar() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(""); 
  const [isAdmin, setIsAdmin] = useState(false); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const storedUsername = localStorage.getItem("username"); 
    const storedIsAdmin = localStorage.getItem("isAdmin"); 

    if (accessToken) {
      const decoded = jwtDecode(accessToken); 

      
      setUsername(storedUsername);
      setIsAdmin(storedIsAdmin === "true"); 

      setUser(decoded); 
    }
  }, []);

  const handleLogout = () => {
    
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    localStorage.removeItem("isAdmin");

    
    setUser(null);
    setUsername("");
    setIsAdmin(false);

    
    setTimeout(() => {
      navigate("/auth"); 
    }, 200); 
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
