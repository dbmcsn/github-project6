import React from "react";
import "./nav.css";
import logo from "../../assets/logo.PNG";
import { NavLink } from "react-router-dom";

const nav = () => {
  return (
    <div className="header">
      <div className="firstHeader">
        <div>
          <img src={logo} alt="The Book" className="logo" />{" "}
        </div>
        <div className="headerOpts">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/books">Books</NavLink>
          <NavLink to="/recommended-books">Recommended Books</NavLink>
        </div>
      </div>
      {/* <div className="searchBar">search bar</div> */}

      <div className="startButtons">
        <NavLink to="/login">
          <button className="login">Log in</button>
        </NavLink>
        <NavLink to="/signup">
          <button className="signUp">Sign Up</button>
        </NavLink>
      </div>
    </div>
  );
};

export default nav;
