import React, { useState, useEffect } from "react";
import "./MyBookings.css"
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import {Routes, Route, useHistory} from "react-router-dom";



const Mybookings = () => {
    return (
        <div id="container">
      <div id="left">
        <div className="group-31 flex-row">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/errwlaicvqu-1838%3A2694?alt=media&token=d0a3af89-9a2e-497e-8d86-37fd76bdcb59"
            alt="Not Found"
            className="setting-1"
          />
          <p className="txt-554">Dashboard</p>
        </div>
        <div className="list-menu flex-row">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/errwlaicvqu-1838%3A2645?alt=media&token=925c7506-e416-4888-a726-bbd63263a889"
            alt="Not Found"
            className="icon-24-outline-key-square"
          />
          <p className="txt-554">Maintenance</p>
        </div>
        <div className="list-menu flex-row">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/errwlaicvqu-1838%3A2652?alt=media&token=24802a63-8ddf-47b4-8236-569e52da555c"
            alt="Not Found"
            className="icon-24-outline-key-square"
          />
          <p className="txt-554">BookDrone</p>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/errwlaicvqu-1838%3A2658?alt=media&token=e25238d9-0bbc-4b53-b0e1-f272dc2fcc40"
            alt="Not Found"
            className="chevron-right-2"
          />
        </div>
        <div className="group-683">
          <div className="list-menu flex-row">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/errwlaicvqu-1838%3A2661?alt=media&token=fddb69ac-23d3-48de-8fb9-05f1be08a1ff"
              alt="Not Found"
              className="icon-24-outline-key-square"
            />
            <p className="txt-554">Managment</p>
            

            <img
              src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/errwlaicvqu-1838%3A2672?alt=media&token=80e10c5e-ed61-4b58-b2e5-d01d0814d01d"
              alt="Not Found"
              className="chevron-right-2"
            />
          </div>

        </div>
        <div className="list-menu flex-row">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/errwlaicvqu-1838%3A2675?alt=media&token=dc3dcaf1-be39-451a-a6c6-9f18ee6e08ed"
            alt="Not Found"
            className="icon-24-outline-key-square"
          />
          <p className="txt-554">Admin</p>

          <img
            src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/errwlaicvqu-1838%3A2682?alt=media&token=4ec1fdce-790b-48cf-b54d-18996fdadb1e"
            alt="Not Found"
            className="chevron-right-2"
          />
        </div>
      </div>
      <div id="right">
        <div className="product">
          <p className="txt-853">All Bookings</p>
          <div className="group-221 flex-col">
            <div className="group-21 flex-row">
              <p className="txt-526">Service ID#</p>
              <p className="txt-526">Farmland</p>
              <p className="txt-526">Land Type</p>
              <p className="txt-526">Service</p>
              <p className="txt-526">Service Time</p>
              <p className="txt-526 flex-hcenter">Status</p>
            </div>

            <div style={{height: '3px', margin: '10px', backgroundColor: 'black'}} />

            <div className="group-1 flex-row-1">
            <p className="txt-1">ID# 1144</p>
            <p className="txt-2">West Plot A</p>
            <p className="txt-3">Crop</p>
            <p className="txt-4">Rental: Data Collection</p>
            <p className="txt-5">06/29/2022</p>
            <div className="frame-1 flex-row-vcenter-hcenter-1">
              <p className="txt-6">Finished</p>
            </div>
          </div>

            <div style={{height: '3px', margin: '10px', backgroundColor: 'black'}} />
            <div className="group-1 flex-row-1">
            <p className="txt-1">ID# 2342</p>
            <p className="txt-2">East Plot B</p>
            <p className="txt-3">Crop</p>
            <p className="txt-4">Rental Payload</p>
            <p className="txt-5">06/29/2022</p>
            <div className="frame-1 flex-row-vcenter-hcenter-1">
              <p className="txt-6">Finished</p>
            </div>
          </div>
            <div style={{height: '3px', margin: '10px', backgroundColor: 'black'}} />
            <div className="group-1 flex-row-1">
            <p className="txt-1">ID# 1564</p>
            <p className="txt-2">South Plot C</p>
            <p className="txt-3">Crop</p>
            <p className="txt-4">Surveillance    </p>
            <p className="txt-5">07/20/2022</p>
            <div className="frame-1 flex-row-vcenter-hcenter-1">
              <p className="txt-6">Finished</p>
            </div>
          </div>
            <div style={{height: '3px', margin: '10px', backgroundColor: 'black'}} />
            <div className="group-1 flex-row-1">
            <p className="txt-1">ID# 5566</p>
            <p className="txt-2">West Plot A</p>
            <p className="txt-3">Crop</p>
            <p className="txt-4">Rental Payload</p>
            <p className="txt-5">08/11/2022</p>
            <div className="frame-1 flex-row-vcenter-hcenter-1">
              <p className="txt-6">Finished</p>
            </div>
          </div>
            <div style={{height: '3px', margin: '10px', backgroundColor: 'black'}} />
            <div className="group-1 flex-row-1">
            <p className="txt-1">ID# 1144</p>
            <p className="txt-2">West Plot A</p>
            <p className="txt-3">Crop</p>
            <p className="txt-4">Rental: Data Collection</p>
            <p className="txt-5">03/20/2022</p>
            <div className="frame-1 flex-row-vcenter-hcenter-1">
              <p className="txt-6">Finished</p>
            </div>
          </div>
            <div style={{height: '3px', margin: '10px', backgroundColor: 'black'}} />
           

            
          </div>
          
        </div>

      </div>
    </div>

  );
};
export default Mybookings;