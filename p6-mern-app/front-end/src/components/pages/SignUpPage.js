import React, { useState } from "react";
import { Nav } from "../../components";
import "./SignUpPage.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const SignUpPage = () => {
  const { setToken, setLogUser } = useAuth();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();

  const navigate = useNavigate();

  const handleSignUp = () => {
    if (password === repeatPassword) {
      axios
        .post("http://localhost:8888/api/users/signup", {
          email: email,
          username: username,
          name: name,
          password: password,
          repeatPassword: repeatPassword,
        })
        .then((res) => {
          if (res.data.success) {
            localStorage.setItem("token", res.data.token);
            setToken(res.data.token);
            setLogUser(res.data.userInfo);
            navigate("/");
          } else {
            alert(res.data.message);
          }
        });
    } else {
      alert("Password didn't match.");
    }
  };

  return (
    <>
      <Nav />
      <div className="signupform">
        <h1>Sign Up Here:</h1>

        <p>Please fill in this form to create an account.</p>

        <label for="email">
          <b>Email: </b>
        </label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label for="username">
          <b>Username: </b>
        </label>
        <input
          type="text"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label for="name">
          <b>Name: </b>
        </label>
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label for="pwd">
          <b>Password: </b>
        </label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label for="psw-repeat">
          <b>Repeat Password: </b>
        </label>
        <input
          type="password"
          name="psw-repeat"
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
        />

        <div className="clearfix">
          <button type="button" class="cancelbtn">
            Cancel
          </button>
          <button type="submit" class="signupbtn" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
