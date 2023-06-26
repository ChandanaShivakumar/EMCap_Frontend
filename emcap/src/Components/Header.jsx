import React from 'react'
import { Link } from "react-router-dom";
import logo from "../images/logo.png"
import '../css/Header.css'
export default function Header() {

    const isLoggedIn = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'))
    const isFresher = user && (user.role_id === 3);
    const isManager = user && (user.role_id === 2);

    function handleLogout() {
        localStorage.clear()
        window.location.href = '/';
    }

    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-dark  shadow  ">
                <div className="container-fluid">
                    <div className="navbar-collapse" id="navbarNavAltMarkup" style={{height: "45px"  }}>
                    <Link to="/">
                        <div className="nav-logo" style={{marginLeft: '5%', marginTop: '5px'}}>
                            <img src={logo} alt="Logo"  style={{ height: "50px", color: 'white', filter: 'brightness(0) invert(1)' }} />
                        </div>
                        </Link> 
                        <div className="navbar-nav ms-auto" style={{marginRight: '4%'}}>

                            {isManager &&
                                <a className="nav-link" href="/manager" style={{ color: 'white' }}>
                                   Manager Profile
                                </a>
                            }
                            {isFresher &&
                                <a className="nav-link" href="/employee" style={{ color: 'white' }}>
                                    Profile
                                </a>
                            }
                            {isManager &&
                                <a className="nav-link" href="/dashboard" style={{ color: 'white' }}>
                                    Dashboard
                                </a>
                            }
                            {isManager &&
                                <a className="nav-link" href="/uploadexcel" style={{ color: 'white' }}>
                                    Upload Excel
                                </a>
                            }
                            {isManager &&
                                <a className="nav-link" href="/updateexcel" style={{ color: 'white' }}>
                                    Update Excel
                                </a>
                            }
                            {isLoggedIn ? (
                                <button className="nav-link" onClick={handleLogout} style={{ color: 'white' }}>
                                    Logout
                                </button>
                            ) : (
                                <Link to="/register">
                                    <button className="nav-link" style={{ color: 'white' }}>
                                        Sign Up
                                    </button>
                                </Link>
                                
                            )}
                            {isLoggedIn ? (
                                <div></div>
                            ) : (
                                <Link to="/login">
                                    <button className="nav-link" style={{ color: 'white' }}>
                                        Sign In
                                    </button>
                                </Link>
                                
                            )}
                            
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

