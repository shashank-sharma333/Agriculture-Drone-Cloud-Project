import React from "react";
import Swal from "sweetalert2";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from "../components/Success";
import { Tag, Divider } from 'antd';
import { Grid } from "antd";
import { Typography } from "antd";
import { Tabs } from "antd";
const { TabPane } = Tabs;



const user = JSON.parse(localStorage.getItem('currentUser'))
function Helpscreen() {
  return (
    <div className="mt-5 ml-3">
      <div className="text-center">
        <div className="col-md-9 " style={{ marginLeft: "150px" }}>
          <h3> WHO WE ARE </h3>
          <h1>An agricultural drone is an unmanned aerial vehicle used in agriculture operations, mostly in yield optimization and in monitoring crop growth and crop production. Agricultural drones provide information on crop growth stages, crop health, and soil variations. Multispectral sensors are used on agricultural drones to image electromagnetic radiation beyond the visible spectrum, including near-infrared and short-wave infrared.
          </h1>
          <h1>
            REACH US AT
          </h1>
          <h1>Email us on : f4@gmail.com</h1>
          <h1>call us on  : 628-243-2420</h1>
        </div>
      </div>
    </div>
  );

}

export default Helpscreen;

