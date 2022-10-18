import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./nav.css";
import logo from "../../assets/logo.png";

const Nav = () => {
  const { token, logUser } = useAuth();
  const [searchItems, setSearchItems] = useState();
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search/${searchItems}`);
  };

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
        <div className="secondContainer">
          <div className="secondHeader">
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
          </div>
          <div className="right">
            <div>
              <input
                type="text"
                placeholder="Search.."
                className="searchBar"
                value={searchItems}
                onChange={(e) => setSearchItems(e.target.value)}
              />
              <input
                type="submit"
                value="Search"
                className="searchButton"
                onClick={handleSearch}
              />
            </div>
            <div>
              <span>Hello there, {logUser.name}! </span>
              <NavLink to="/logout">
                <button className="logOut"> Log Out</button>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
