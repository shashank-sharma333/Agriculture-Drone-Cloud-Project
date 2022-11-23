import React from 'react'
import React, { useState, useEffect } from "react";
import "./map.css"



export default function Map() {
  return (
    
    <div >
        <br/><h3>IoT Stations location on Google Maps</h3><br/>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.2832490463443!2d-121.88243531050216!3d37.335802372038145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fccbc0b22b081%3A0xe370813fc863d57f!2sDr.%20Martin%20Luther%20King%2C%20Jr.%20Library!5e0!3m2!1sen!2sus!4v1668247922836!5m2!1sen!2sus" 
        width="1100"
        height="400"
        style={{ border: "0" }}
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
}
