// import React from "react";
// import logo from "./img/logo.png"
// import "./Header.scss";
// import { Link } from "react-router-dom";

// function Header() {
// 	return (
// 		<nav className="navbar">
// 			<div className="navbar-logo">
// 				<img src={logo} alt="Logo" />
// 			</div>
// 			<div className="navbar-signup">
// 			<Link to="/signup">
// 				<button>Sign Up</button>
// 			</Link>
// 			</div>
// 		</nav>
// 	);
// }
// export default Header;
import React from "react";
import logo from "./img/logo.png";
import { Link } from "react-router-dom";
import './Header.css'
function Header(props) {
  const isLoggedIn = localStorage.getItem('token');
  const isManager = localStorage.getItem('user')
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="navbar-signup">
        {isLoggedIn ? (
          <button className="Buttons2" onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/signup">
            <button className="Buttons2">Sign Up</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;
