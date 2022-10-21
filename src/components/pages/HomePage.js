import React from "react";
import { Nav, HomeBooks } from "../../components";
import "./HomePage.css";

const HomePage = () => {
  return (
    <>
      <Nav />
      <div className="body">
        <div className="quote">
          <h2>"So many books, so little time..."</h2>
        </div>
        <HomeBooks />
      </div>
    </>
  );
};

export default HomePage;
