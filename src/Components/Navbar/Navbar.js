import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import { Toolbar } from '@material-ui/core';
import { AppBar } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { server } from "../API/Server";

import "./Navbar.css";
import axios from "axios";

export default function Navbar() {
  var history = useHistory();
  var isAuthenticated = false;
  var auth_token = localStorage.getItem("auth_token");
  var username = localStorage.getItem("username");
  const [logout, setLogout] = useState();
  const nextURL = useParams();
  // const id = useParams();
  console.log("next", nextURL);

  if (auth_token && username) {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
  }

  function logoutFun() {
    axios
      .get(`${server}/logout/`)
      .then((res) => {
        setLogout(res.data);
        console.log(res.data);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("username");
        localStorage.removeItem("id");

        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          style={{
            backgroundColor: "#f1f1f1",
            position: "fixed",
            width: "100%",
            height: "20px",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ color: "#000" }}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              CAR SERVICE MANAGEMENT SYSTEM
            </Link>
          </Typography>

          {isAuthenticated ? (
            <div className="authenticated-div">
              <p className="welcome-txt"  style={{ color: "Red", marginLeft:"350px", fontSize:"20px", fontWeight:"bold" }}>{`Welcome ${username}`}</p>
              <Link to="/home/" style={{ textDecoration: "none" }}>
                <p className="logout-txt"  style={{ color: "purple", marginLeft:"250px", fontSize:"20px", fontWeight:"bold" }}>Purchased Services</p>
              </Link>
              <p className="logout-txt" onClick={logoutFun}  style={{ color: "Green", marginLeft:"150px",fontSize:"20px", fontWeight:"bold" }}>
                Logout
              </p>
            </div>
          ) : (
            <>
              <Button color="inherit" style={{ color: "#000", marginLeft:"950px" }}>
                <Link
                  to="/login/next=homepage"
                  style={{ textDecoration: "none" }}
                >Login</Link>
              </Button>
              <Button color="inherit" style={{ color: "#000",marginLeft:"100px" }}>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  Signup
                </Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <div style={{ height: "50px" }}></div>
    </Box>
  );
}