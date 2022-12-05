import React, { useState, useEffect } from "react";
import {useDispatch , useSelector} from 'react-redux'
import axios from "axios";
import './screen.css';
import Error from "../components/Error";
import Loader from "../components/Loader";
import { Button } from "react-bootstrap";
import { Checkbox } from "antd";
import {Routes, Route, useHistory} from "react-router-dom";
import Success from '../components/Success'
export default function Registerscreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const[address,setaddress] = useState("");
  const[govermentID,setid] = useState("");
  const [cpassword, setcpassword] = useState("");
  const[loading, setloading]=useState(false)
  const[error, seterror]=useState(false)
  const[success, setsuccess]=useState(false) 
  const navigate = useHistory();

  const navigateToHome = () => {
      // 👇️ navigate to /contacts
      register();
      navigate.push('/SelectionScreen');
  };

  async function register(){
  
      if(password!=cpassword)
      {
          alert("passwords not matched")
      }
      else{
          const user={
              name,
              email,
              password
          }
          
          try {
            setloading(true)
            const result = await axios.post('/api/users/register',user)
            setloading(false)
            setsuccess(true)
            setemail('')
            setname('')
            setaddress('')
            setid('')
            setcpassword('')
            setpassword('')
          } catch (error) {
            seterror(true)
            setloading(false)
            console.log(error);
          }
      
      }

  }

  return (
    <div className='register'>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">

          {loading && (<Loader/>)}
          {success && (<Success success='User Registered Successfully' />)}
          {error && (<Error error='Email already registred' />)}

          <h2 className="text-center m-2" style={{ fontSize: "35px" }}>
            Register
          </h2>
          <div>
            <input required type="text" placeholder="name" className="form-control mt-1" value={name} onChange={(e)=>{setname(e.target.value)}} />
            <input required type="text" placeholder="Adress" className="form-control mt-1" value={address} onChange={(e)=>{setaddress(e.target.value)}} />
            <input required type="text" placeholder="GovermentID" className="form-control mt-1" value={govermentID} onChange={(e)=>{setid(e.target.value)}} />
            <input required type="email" placeholder="email" className="form-control mt-1" value={email} onChange={(e)=>{setemail(e.target.value)}} />
            <input
              type="password"
              placeholder="password"
              className="form-control mt-1"
              value={password}
              required
              onChange={(e)=>{setpassword(e.target.value)}}
            />
            <input
              type="password"
              placeholder="confirm password"
              className="form-control mt-1"
              value={cpassword}
              required
              onChange={(e)=>{setcpassword(e.target.value)}}
            />
              {/* <div class="rewards">
  <input type="checkbox" id="rewards" name="rewards"/>
  <label for="rewards">Opt in for Rewards</label>
</div> */}
            <button onClick={register} className="btn btn-primary rounded-pill mt-3 mb-3">REGISTER</button>
            <br/>
            <a style={{color:'black'}} href="/login">Click Here To Login</a>  &ensp;  &ensp;

            
            
          </div>
        </div>
      </div>
    </div>
  );
}