import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { server } from "../API/Server";
import "./Register.css";
import Navbar from "../Navbar/Navbar";

function Register() {
  var history = useHistory();

  const [username, setUsername] = useState("");
  const [usernameRequired, setUsernameRequired] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [passwordMinLength, setPasswordMinLength] = useState(false);

  const [confirmpassword, setConfirmpassword] = useState("");

  const [pwdDidNotMatch, setPwdDidNotMatch] = useState(false);

  const [email, setEmail] = useState("");
  const [emailrequired, setEmailrequired] = useState(false);

  const [error, setError] = useState(false);

  var user_token = localStorage.getItem("car_service_auth_token");
  var user_username = localStorage.getItem("car_service_app_username");
  console.log("user_token", user_token);

  useEffect(() => {
    if (user_token && user_username) {
      history.push("/profile");
    }
  });

  const registerBtn = () => {
    if (username == "" && password == "" && email == "") {
      setUsernameRequired(true);
      setPasswordRequired(true);
      setEmailrequired(true);
    } else {
      if (username == "") {
        setUsernameRequired(true);
      } else {
        setUsernameRequired(false);
      }

      if (password == "") {
        setPasswordRequired(true);
      } else {
        if (password.length < 4) {
          setPasswordRequired(false);
          setPasswordMinLength(true);
        } else {
          setPasswordRequired(false);
          setPasswordMinLength(false);
        }
      }

      if (email == "") {
        setEmailrequired(true);
      } else {
        setEmailrequired(false);
      }
      if (confirmpassword == "") {
        setPasswordRequired(true);
      } else {
        setPasswordRequired(false);
      }

      if (password != confirmpassword) {
        console.log("password:", password.length);
        console.log("confirmpassword:", confirmpassword);
        setPwdDidNotMatch(true);
      } else {
        setPwdDidNotMatch(false);
      }
      if (
        username != "" &&
        email != "" &&
        password != "" &&
        confirmpassword != "" &&
        password == confirmpassword &&
        password.length > 4
      ) {
        console.log("working 001 ---");
        createUserFunc();
      }
    }
  };

  function createUserFunc() {
    axios
      .post(`${server}/register/`, {
        username: username,
        email: email,
        password: password,
        confirmpassword: confirmpassword,
      })
      .then((res) => {
        console.log("posting data", res.data);
        if (res.data["Token"]) {
          localStorage.setItem("auth_token", res.data["Token"]);
          localStorage.setItem("username", username);
          history.push("/login");
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        setError(true);
      });
  }

  return (
    <div>
      <Navbar />
      <div className="body">
        <div className="container">
          <h3>Register</h3>
          {error ? <p className="text-danger">User already exist!</p> : null}
          <div className="form">
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameRequired ? (
              <span className="text-dange
              r">This field is required</span>
            ) : null}
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailrequired ? (
              <span className="text-danger">This field is required</span>
            ) : null}
            <label>Password</label>
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordRequired ? (
              <span className="text-danger">This field is required</span>
            ) : null}
            {passwordMinLength ? (
              <span className="text-danger">Min length 4!</span>
            ) : null}

            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm Password"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
            {passwordRequired ? (
              <span className="text-danger">This field is required</span>
            ) : null}

            {pwdDidNotMatch ? (
              <p className="text-danger">Password did not match!</p>
            ) : null}
            <input
              className="submit"
              type="submit"
              value="Register"
              onClick={registerBtn}
            />
            <span>
              Have an account? <Link to="/login">Login</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;