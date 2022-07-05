import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { server } from "../API/Server";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom";


function Home() {
    const [data, setData] = useState([]);
    var user_token = localStorage.getItem("auth_token");
    useEffect(() => {
        axios.get(`${server}/serviceissuedetail/${user_token}/`).then((res) => {
          console.log("------", res.data);
          setData(res.data)
        });
      }, []);

  return (
    <div>
        <Navbar/>
        <h1 style={{marginTop:"85px"}}>PURCHASED SERVICES</h1>
        <div style={{display:"flex",flexDirection:"row",flex: "0 0 10%",flexWrap:"wrap"}}>
        { data && data.map((data, index) => {
        return(
        <Card sx={{ width: 400, backgroundColor: "yellow", marginLeft: 20, marginTop:10}}>
      <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         Car Model: {data.car_model}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         Number plate: {data.number_plate_no}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         Service Name: {data.service_name.service_name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         Service Date: {data.service_date}
        </Typography>
      </CardContent>
    </Card>
    )
})}
</div>
    </div>
  )
}

export default Home