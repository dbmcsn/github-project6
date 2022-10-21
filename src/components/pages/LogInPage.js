import React, { useState } from "react";
import { Nav } from "../../components";
import "./LogInPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const LogInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, setLogUser, logUser } = useAuth();

  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("http://localhost:8888/api/users/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          navigate("/");
          setToken(res.data.token);
          setLogUser(res.data.userInfo);
        } else {
          alert(res.data.message);
        }
      });
  };

  return (
    <>
      <Nav />
      <div>
        <h1>Log In Here:</h1>
        <div className="loginform">
          <label for="username">
            <b>Username: </b>
          </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label for="pwd">
            <b>Password: </b>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="submitButton">
            <button
              type="submit"
              class="logInButton"
              onClick={() => handleLogin()}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogInPage;
