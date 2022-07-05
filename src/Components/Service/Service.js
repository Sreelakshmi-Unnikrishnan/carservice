import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../API/Server";
import {useHistory, useParams } from "react-router-dom";

function Service() {
    const [user, setUser] = useState("");
    const [address, setAddress] = useState("");
    const [carmodel, setCarmodel] = useState("");
    const [numberplate, setNumberplate] = useState("");
    const [service_date, setDate] = useState("");
    const [service_name, setServicename] = useState("");
    const [module, setModule] = useState([]);
    const [service, setService] = useState([]);
    const history = useHistory();
    const [data, setData] = useState([]);
const id=useParams();
    const handleSubmit = () => {
        axios
          .post(`${server}/addservice/`, {
            user: user,
            address: address,
            car_model: carmodel,
            number_plate_no: numberplate,
            service_name: service,
            service_date:service_date
          })
          .then((response) => {
            setModule(response.data);
            console.log("-hh---", response.data);
            history.push("/home/");
          })

          .catch((error) => {
            console.log("error", error);
          });
          alert('data have been added!');
    }
    const handleSubmits = () => {
        axios.get(`${server}/home/`).then((res) => {
            console.log("------", res.data);
            setData(res.data)
            // console.log("------1", res.data[0]);
})};
useEffect(() => { 
          axios.get(`${server}/listing/${id["id"]}`).then((res) => {
              setService(res.data.service_name)
              console.log("------***", res.data.service_name);
            
            });
          }, []);
    
  return (
    <div>
        <h1 style={{marginTop:"80px"}}>BOOK CAR SERVICE</h1>
        <div className="body">
        <div className="container">
          <div className="form">
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <label>Address</label>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <label>Car Model</label>
            <input
              type="text"
              required
              placeholder="Car Model"
              value={carmodel}
              onChange={(e) => setCarmodel(e.target.value)}
            />
            <label>Number Plate</label>
            <input
              type="text"
              name="numberplate"
              placeholder="Number Plate"
              value={numberplate}
              onChange={(e) => setNumberplate(e.target.value)}
            />
             <label>Service Name</label>
             <select onClick={handleSubmits} style={{height:"50px", borderRadius:"12px",borderColor:"rgb(143, 13, 13)"}} onChange={(e) => setServicename(e.target.value)}> 
                <option value="⬇️ Select a service ⬇️"> {service} </option>
                {/* Mapping through each fruit object in our fruits array
          and returning an option element with the appropriate attributes / values.
            */}
            {data.map((data) => {return(<option>{data.service_name}</option>)})}
            {/* <option>{data.service_name}</option> */}
            </select>
            <label>Service Date</label>
            <input
              type="date"
              placeholder="Service date"
                value={service_date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              className="submit"
              type="submit"
              value="Submit"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Service