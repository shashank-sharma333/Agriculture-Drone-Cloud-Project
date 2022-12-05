import logo from "./logo.svg";
import "./App.css";
import React, { Component }  from 'react';

import {BrowserRouter, Route , path} from 'react-router-dom'
import Homescreen from "./screens/Homescreen";
import Navbar from "./components/Navbar";
import Loginscreen from "./screens/Loginscreen";
import Registerscreen from "./screens/Registerscreen";
import 'antd/dist/antd.css';
import Bookingscreen from "./screens/Bookingscreen";
import Profilescreen from "./screens/Profilescreen";
import Helpscreen from "./screens/Helpscreen";
import Landingscreen from "./screens/Landingscreen";
import Adminscreen from "./screens/Adminscreen";
import SelectionScreen from "./screens/SelectionScreen";
import RegisterFarmerScreen from "./screens/RegisterFarmerScreen";
import Form from "./screens/Form";
import RegisterFarmerScreen2 from "./screens/RegisterFarmerScreen2";
import CreateProfile from "./screens/CreateProfile";
import CreatePilotProfile from "./screens/CreatePilotProfile";
import TestFile from "./screens/TestFile";



import './App.css'
import RegisterPilotScreen from "./screens/RegisterPilotScreen";
// import hotelimage from "./images/back.png";
    
function App() {


  return (

  //   <div
  //   class="bg_image"
  //   style={{
  //     backgroundImage: 'url('+hotelimage+')',
  //     backgroundSize: "cover",
  //     height: "280vh",
  //     color: "#f5f5f5",
      
  //     backgroundRepeat: 'no-repeat'
  //   }}
  // >

    
    <div className="App">
      <Navbar />
      <BrowserRouter>
      
         <Route path="/" exact component={Landingscreen}/>
         <Route path="/home" exact component={Homescreen}/>
         <Route path="/login" component={Loginscreen}/>
         <Route path="/register" component={Registerscreen}/>
         <Route path="/book/:roomid/:fromdate/:todate" component={Bookingscreen}/>
         <Route path="/profile" component={Profilescreen}/>
         <Route path="/HelpScreen" component={Helpscreen}/>
         <Route path="/admin" component={Adminscreen}/>
         <Route path="/registerfarmer" component={RegisterFarmerScreen}/>
         <Route path="/selectionscreen" component={SelectionScreen}/>
         <Route path="/registerpilot" component={RegisterPilotScreen}/>
         <Route path="/form" component={Form}/>
         <Route path="/component" component={RegisterFarmerScreen2}/>
         <Route path="/createprofile" component={CreateProfile}/>
         <Route path="/createpilotprofile" component={CreatePilotProfile}/>


      </BrowserRouter>
    </div>
    // </div>
  );
}

export default App;