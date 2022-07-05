import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import "./Login.css";
import { server } from "../API/Server";
import Navbar from "../Navbar/Navbar";

function Login() {
  const [username, setUsername] = useState("");
  const [usernameRequired, setUsernameRequired] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordRequired, setPasswordRequired] = useState(false);

  const [error, setError] = useState(false);

  const history = useHistory();
  const nextURL = useParams();
  const id = useParams();
  console.log("next", nextURL);

  var user_token = localStorage.getItem("auth_token");
  var user_username = localStorage.getItem("username");
  var i = localStorage.getItem("id");

  useEffect(() => {
    if (user_token && user_username) {
      history.push("/profile/");
    }
  });

  const loginBtn = () => {
    if (username == "" && password == "") {
      setUsernameRequired(true);
      setPasswordRequired(true);
    } else {
      if (username == "") {
        setUsernameRequired(true);
      } else {
        setUsernameRequired(false);
      }

      if (password == "") {
        setPasswordRequired(true);
      } else {
        setPasswordRequired(false);
      }
      if (username != "" && password != "") {
        postData();
      }
    }
   
  };

  function postData() {
    axios
      .post(`${server}/login/`, {
        username,
        password,
      })
      .then((res) => {
        localStorage.setItem("auth_token", res.data["token"]);
        localStorage.setItem("username", username);
        if (nextURL["next"] == "next=paymentpage") {
          history.push(`/addservice/${i}`);
        } else if (nextURL["next"] == "next=homepage") {
          history.push(`/addservice/${i}`);
        } else {
          history.push(`/addservice/${i}`);
        }
        localStorage.removeItem("id");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }

  return (
    <div>
      <Navbar />
      <div className="login-first-div">
        <div className="login-second-div">
          <h3>Login</h3>
          {error ? <p>Invalid Credentials</p> : null}

          <div className="form1">
            <label>Username</label>
            <input
              className="input"
              type="text"
              required
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameRequired ? (
              <span className="text-danger">This field is required</span>
            ) : null}

            <label>Password</label>
            <input
              type="password"
              required
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordRequired ? (
              <span className="text-danger">This field is required</span>
            ) : null}
            <input
              className="submit"
              type="submit"
              value="Login"
              onClick={loginBtn}
            />
            <span>
              Don't have an account? <Link to="/register">Join Now</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;