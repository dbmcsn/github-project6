import React from "react";
import "./nav.css";
import logo from "../../assets/logo.PNG";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Nav = () => {
  const { token, logUser } = useAuth();

  return (
    <div className="header">
      {!token ? (
        <div className="firstHeader">
          <div className="logoImg">
            <NavLink to="/">
              <img src={logo} alt="The Book" className="logo" /> {""}
            </NavLink>
          </div>
          <div className="startButtons">
            <NavLink to="/login">
              <button className="login">Log in</button>
            </NavLink>
            <NavLink to="/signup">
              <button className="signUp">Sign Up</button>
            </NavLink>
          </div>
        </div>
      ) : (
        <div>
          <div className="firstHeader">
            <div className="logoImg">
              <NavLink to="/">
                <img src={logo} alt="The Book" className="logo" /> {""}
              </NavLink>
            </div>

            <div className="headerOpts">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/books">Books</NavLink>
              <NavLink to="/recommended-books">Recommended Books</NavLink>
            </div>

            {/* <div className="searchBar">search bar</div> */}
            <span>Hello there, {logUser.name}! </span>

            <NavLink to="/logout">
              <button className="logOut"> Log Out</button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
