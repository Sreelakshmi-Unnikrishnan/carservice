import React, { useState, useEffect } from "react";
import "./Landing.css";
import Navbar from "../Navbar/Navbar";
import car from "../Images/car.jpeg";
import axios from "axios";
import { server } from "../API/Server";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link, useParams} from "react-router-dom";
import Button from "@mui/material/Button";

function Landing() {
    const [data, setData] = useState([]);
    var isAuthenticated = false;
    var auth_token = localStorage.getItem("auth_token");
    var username = localStorage.getItem("username");
const id =useParams();
    if (auth_token && username) {
        isAuthenticated = true;
      } else {
        isAuthenticated = false;
      }

    useEffect(() => {
        axios.get(`${server}/home/`).then((res) => {
          console.log("------", res.data);
          setData(res.data)
          // console.log("------===", res.data["id"]);
          
        });
      }, []);
     
  return (
    <div>
         <Navbar />
         <div>
        <img src={car} alt="" className="banner-img"/>
      </div>
      <h1>Our Services</h1>
      <div style={{display:"flex",flexDirection:"row",flex: "0 0 10%",flexWrap:"wrap"}}>
      { data && data.map((data, index) => {
        localStorage.setItem("id",data.id)
        return(
        <Card sx={{ width: 400, backgroundColor: "yellow", marginLeft: 20, marginTop:10}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         Service Name: {data.service_name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Service Details: {data.service_details}
        </Typography>
        <Typography variant="body2">
        Service Rate: {data.service_rate}
        </Typography>
       
              {isAuthenticated ? (
            <div className="authenticated-div">
             <Link to={`/addservice/${data.id}`} style={{ textDecoration: "none" }}>
                <p className="logout-txt"  style={{ color: "purple", marginLeft:"120px", fontSize:"20px", fontWeight:"bold" , marginTop:"10px"}}>Book Now!</p>
              </Link>
            </div>
          ) : (
            <>
              <Button color="inherit" style={{ color: "#000" }}>
                <Link
                  to="/login/next=homepage"
                  style={{ textDecoration: "none" }}
                >Book Now</Link>
              </Button>
            </>
          )}
      </CardContent>
    </Card>
    )
})}
</div>
    </div>
  )
}

export default Landing