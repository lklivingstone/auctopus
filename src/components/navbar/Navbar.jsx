import React from 'react';
import { useNavigate } from "react-router-dom";
import './Navbar.css';
import { NavbarItem } from '../navbarItem/NavbarItem';

function Navbar() {
    const navigate= useNavigate()

    const handleLogoutClick = () => {
        navigate("/logout")
    };

    const handleHomeClick = () => {
        navigate("/")
    };
    const handleDashboardClick = () => {
        navigate("/dashboard")
    };

    return (
        <nav className='navbar' style={{ display: "flex", padding: "20px"}}>
            <div style={{display: "flex", flex: 1, justifyContent: "space-between", padding: "10px 40px"}}>
                <NavbarItem label="home" onClick={() => handleHomeClick()}/>
                <NavbarItem label="Dashboard" onClick={() => handleDashboardClick()}/>
            </div>
            <div style={{display: "flex", flex: 2, justifyContent: "flex-end", padding: "10px 40px", alignItems: "center"}}>
                
            <NavbarItem 
                label="Logout"
                onClick={() => handleLogoutClick()}
            />
                
            </div>
            <div className="border"></div>
        </nav>
  );
}

export default Navbar;