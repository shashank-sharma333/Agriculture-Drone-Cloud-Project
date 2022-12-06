import React, { useState, useEffect } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar } from "react-date-range";
import { DateRangePicker } from "react-date-range";
import moment from "moment";
import Select from 'react-select';
import AsyncSelect from "react-select/async";
import axios from "axios";
import Loader from "../components/Loader";
import Room from "../components/Room";
import { DatePicker, Space } from "antd";
import AOS from 'aos';
import 'aos/dist/aos.css';
import './screen.css';

import Swal from "sweetalert2";
import Error from "../components/Error";

import { Tag, Divider } from 'antd';


import { Tabs } from "antd";
const { TabPane } = Tabs;
const user = JSON.parse(localStorage.getItem('currentUser'))
AOS.init();
const { RangePicker } = DatePicker;
var dupdate = null;
var dupdate1 = null;
var dupdate2 = null;


function Homescreen() {


  const aquaticCreatures = [
    { label: 'san jose', value: 'san jose' },
    { label: 'santa clara', value: 'santa clara' }
  ];


  const [hotels, sethotels] = useState([]);
  const [duplicatehotes, setduplicatehotes] = useState([]);
  const [fromdate, setfromdate] = useState('');
  const [todate, settodate] = useState('')
  const [loading, setloading] = useState(false);
  const [searchkey, setsearchkey] = useState('');
  const [location, setLocation] = useState('all')
  const [searchlockey, setsearchlockey] = useState('');
  const[type , settype]=useState('all')

  //NEW CODE
  const [mybookings, setmybookings] = useState([]);
  //const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);
  //NEW CODE

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }

  function filterByDate(dates) {
    setfromdate(moment(dates[0]).format('MM-DD-YYYY'))
    settodate(moment(dates[1]).format('MM-DD-YYYY'))
    var temp=[]

    function confirmBooking(filtered_hotels){
      for (var room of filtered_hotels) {
        var availability = false;

        for (var booking of room.currentbookings) {

          if (room.currentbookings.length) {
            if (
                !moment(moment(dates[0]).format('MM-DD-YYYY')).isBetween(booking.fromdate, booking.todate) &&
                !moment(moment(dates[1]).format('MM-DD-YYYY')).isBetween(booking.fromdate, booking.todate)
            ) {
              if (
                  moment(dates[0]).format('MM-DD-YYYY') !== booking.fromdate &&
                  moment(dates[0]).format('MM-DD-YYYY') !== booking.todate &&
                  moment(dates[1]).format('MM-DD-YYYY') !== booking.fromdate &&
                  moment(dates[1]).format('MM-DD-YYYY') !== booking.todate
              ) {
                availability = true;
              }
            }
          }
        }
        if (availability || room.currentbookings.length === 0) {
          temp.push(room)
        }
        sethotels(temp)
      }
    }

    if(dupdate == null && dupdate1 == null && dupdate2 == null) {
      confirmBooking(duplicatehotes)
    }
    else if(dupdate1 == null && dupdate2 == null){
      confirmBooking(dupdate)
    }
    else if((dupdate == null && dupdate2 == null) || dupdate2 == null){
      confirmBooking(dupdate1)
    }
    else{
      confirmBooking(dupdate2)
    }
  }

  useEffect(async () => {
    try {
      setloading(true);
      const rooms = await (await axios.get("/api/rooms/getallrooms")).data;
      
      //NEW CODE
      const data = await (
        await axios.post("/api/bookings/getuserbookings", {
          userid: JSON.parse(localStorage.getItem("currentUser"))._id,
        })
      ).data;
      //NEW CODE

      //NEW CODE
      setmybookings(data);
      //NEW CODE

      console.log(rooms);
      sethotels(rooms);
      setduplicatehotes(rooms)
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);

      //NEW CODE
      seterror(true);
      //NEW CODE
    }
  }, []);

  //NEW CODE
  async function cancelBooking(bookingid, roomid) {


    try {
      setloading(true);
      const result = await axios.post('/api/bookings/cancelbooking', { bookingid: bookingid, userid: user._id, roomid: roomid });
      setloading(false);
      Swal.fire('Congrats', 'Your Room has cancelled succeessfully', 'success').then(result => {
        window.location.href = '/profile'
      })
    } catch (error) {
      Swal.fire('Oops', 'Something went wrong', 'error').then(result => {
        window.location.href = '/profile'
      })
      setloading(false)
    }

  }
  //NEW CODE

  function filterBySearch()
  {
    dupdate1 = null;
    if(dupdate == null) {
      dupdate1 = duplicatehotes.filter(room => room.name.toLowerCase().includes(searchkey))
      sethotels(dupdate1)
    }
    else{
      dupdate1 = dupdate.filter(room => room.name.toLowerCase().includes(searchkey))
      sethotels(dupdate1)
    }
  }

  function filterByLocation(e)
  {
    dupdate = null;
    setLocation(e)
    // if(dupdate2 !== null && (dupdate1 !== null || dupdate1 == null)){
    //   if(e!=='all'){
    //     dupdate = dupdate2.filter(room=>room.location.toLowerCase().includes(e.toLowerCase()))
    //     sethotels(dupdate)
    //   }
    //   else{
    //     dupdate = dupdate2
    //     sethotels(dupdate)
    //   }
    // }
    if(dupdate2 == null && dupdate1 !== null){
      if (e !== 'all') {
        dupdate = dupdate1.filter(room => room.location.toLowerCase().includes(e.toLowerCase()))
        sethotels(dupdate)
      } else {
        dupdate = dupdate1
        sethotels(dupdate)
      }
    }
    if(dupdate1 == null && dupdate2 == null) {
      if (e !== 'all') {
        dupdate = duplicatehotes.filter(room => room.location.toLowerCase().includes(e.toLowerCase()))
        sethotels(dupdate)
      } else {
        dupdate = duplicatehotes
        sethotels(dupdate)
      }
    }
  }

  

  function filterByType(e)
  {
    dupdate2 = null;
    settype(e)
    if(dupdate == null && dupdate1 == null) {
      if (e !== 'all') {
        dupdate2 = duplicatehotes.filter(room => room.type.toLowerCase().includes(e.toLowerCase()))
        sethotels(dupdate2)
      } else {
        dupdate2 = duplicatehotes
        sethotels(dupdate2)
      }
    }
    else if(dupdate1 == null){
      if (e !== 'all'){
        dupdate2 = dupdate.filter(room => room.type.toLowerCase().includes(e.toLowerCase()))
        sethotels(dupdate2)
      } else {
      dupdate2 = dupdate
      sethotels(dupdate2)
      }
    }
    else {
      if (e !== 'all') {
        dupdate2 = dupdate1.filter(room => room.type.toLowerCase().includes(e.toLowerCase()))
        sethotels(dupdate2)
      } else {
        dupdate2 = dupdate1
        sethotels(dupdate2)
      }
    }
  }

  return (
      <body>
        <div className="mt-5">
        <div className="container">
          <div className="row bs p-3 m-5">
            <div className="col-md-3">

              {/* <Select
  options={aquaticCreatures}

  onChange={e => {setsearchlockey(e.value)}}
/> */}
              <select className="form-control m-2" value={location} onChange={(e)=>{filterByLocation(e.target.value)}} >

                <option value="all">Select Location</option>
                <option value="Monterey">Monterey</option>
                <option value="san Jose">San Jose</option>
                <option value="san Francisco">San Francisco</option>

              </select>
            </div>

            <div className="col-md-3">
              <input
                  type="text"
                  className="form-control i2 m-2"
                  placeholder='Search Drone'
                  value={searchkey}
                  onKeyUp={filterBySearch}
                  onChange={(e)=>{setsearchkey(e.target.value)}}
              />
            </div>

            <div className="col-md-3">
              <select className="form-control m-2" value={type} onChange={(e)=>{filterByType(e.target.value)}} >

                <option value="all">Select Drone type</option>
                <option value="DJI MATRICE 200">DJI MATRICE 200</option>
                <option value="classic">DJI PANTOM</option>
                <option value="classic">Phoenix 6 </option>

              </select>
            </div>

            <div className="col-md-3">
              <RangePicker disabledDate={disabledDate} placeholder={["check-in", "check-out"]} style={{ height: "38px" }} onChange={filterByDate} format='MM-DD-YY' className='m-2'/>
            </div>

          </div>
        </div>

        

        <div className="row justify-content-center">
          {loading ? (
              <Loader />
          ) : (
              hotels.map((room) => {
                return (
                    <div className="col-md-8" data-aos='zoom-in'>
                      <Room room={room} fromdate={fromdate} todate={todate}/>
                    </div>
                );
              })
          )}
        </div>

        <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        mybookings.map(booking => {
          return <div className="row">
            <div className="col-md-6 my-auto">
              <div className='bs m-1 p-2'>
                <h1>{booking.room}</h1>
                <p>BookingId : {booking._id}</p>
                <p>TransactionId : {booking.transactionId}</p>
                <p><b>Check In : </b>{booking.fromdate}</p>
                <p><b>Check Out : </b>{booking.todate}</p>
                <p><b>Amount : </b> {booking.totalAmount}</p>
                <p><b>Status</b> : {booking.status == 'booked' ? (<Tag color="green">Confirmed</Tag>) : (<Tag color="red">Cancelled</Tag>)}</p>
                <div className='text-right'>
                  {booking.status == 'booked' && (<button className='btn btn-primary' onClick={() => cancelBooking(booking._id, booking.roomid)}>Cancel Booking</button>)}
                </div>
              </div>
            </div>
          </div>
        })
      )}
    </div>


      </div>
      </body>


  );
}

export default Homescreen;






// import React, { useEffect, useState } from "react";
// import { Tabs } from "antd";
// import axios from "axios";
// import Swal from "sweetalert2";
// import Error from "../components/Error";
// import Loader from "../components/Loader";
// import Success from "../components/Success";
// import { Tag, Divider } from 'antd';
// const { TabPane } = Tabs;

// const user = JSON.parse(localStorage.getItem('currentUser'))

// export const DroneManagement = () => {
//   const [mydrones, setmydrones] = useState([]);
//   const [loading, setloading] = useState(false);
//   const [error, seterror] = useState(false);
//   const [success, setsuccess] = useState(false);
//   useEffect(async () => {
//     try {
//       setloading(true);
//       const data = await (
//         await axios.post("/api/drones/getalldrones", {
//           //userid: JSON.parse(localStorage.getItem("currentUser"))._id,
//         })
//       ).data;
//       setmydrones(data);
//       setloading(false);
//     } catch (error) {
//       setloading(false);
//       seterror(true);
//     }
//   }, []);

//   async function deleteDrone(droneid) {


//     try {
//       setloading(true);
//       const result = await axios.post('/api/drones/deletedrones', { droneid: droneid});
//       setloading(false);
//       Swal.fire('Congrats', 'Your Drone has been deleted succeessfully', 'success').then(result => {
//         window.location.href = '/droneManagement'
//       })
//     } catch (error) {
//       Swal.fire('Oops', 'Something went wrong', 'error').then(result => {
//         window.location.href = '/droneManagement'
//       })
//       setloading(false)
//     }

//   }

//   return (
//     <div>
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Error />
//       ) : (
//         mydrones.map(Drone => {
//           return <div className="row">
//             <div className="col-md-6 my-auto">
//               <div className='bs m-1 p-2'>
//                 <h1>{Drone.drone}</h1>
//                 <p>Drone Id : {Drone._id}</p>
//                 <p><b>Drone Name : </b>{Drone.droneName}</p>
//                 <p><b>Drone Type : </b>{Drone.droneType}</p>
//                 <p><b>Camera Type : </b>{Drone.cameraType}</p>
//                 <p><b>Flight Time : </b>{Drone.flightTime}</p>
//                 <p><b>Speed : </b>{Drone.speed}</p>
//                 <p><b>Weight : </b>{Drone.weight}</p>
//                 <p><b>Price : </b>{Drone.price}</p>
//                 <p><b>Check Out : </b>{Drone.todate}</p>
//                 <p><b>Amount : </b> {Drone.totalAmount}</p>
//                 <p><b>Status</b> : {Drone.status == 'available' ? (<Tag color="green">Available</Tag>) : (<Tag color="red">Booked</Tag>)}</p>
//                 <div className='text-center'>
//                   {Drone.status == 'available' && (<button className='btn btn-primary' onClick={() => deleteDrone(Drone._id, Drone.droneid)}>Delete Drone</button>)}
//                 </div>
//                 <div className='text-right'>
//                   {Drone.status == 'available' && (<button className='btn btn-primary' onClick={() => deleteDrone(Drone._id, Drone.droneid)}>Edit Drone</button>)}
//                 </div>
//               </div>
//             </div>
//           </div>
//         })
//       )}
//     </div>
//   );
// };







// // import React, { useState, useEffect } from "react";
// // import "react-date-range/dist/styles.css"; // main style file
// // import "react-date-range/dist/theme/default.css"; // theme css file
// // import { Calendar } from "react-date-range";
// // import { DateRangePicker } from "react-date-range";
// // import moment from "moment";
// // import Select from 'react-select';
// // import AsyncSelect from "react-select/async";
// // import axios from "axios";
// // import Loader from "../components/Loader";
// // import Drone from "../components/Drone";
// // import { DatePicker, Space } from "antd";
// // import AOS from 'aos';
// // import 'aos/dist/aos.css';
// // import './screen.css';
// // AOS.init();
// // const { RangePicker } = DatePicker;
// // var dupdate = null;
// // var dupdate1 = null;
// // var dupdate2 = null;


// // function DroneManagement() {


// //   const aquaticCreatures = [
// //     { label: 'san jose', value: 'san jose' },
// //     { label: 'santa clara', value: 'santa clara' }
// //   ];
// //   const drone = JSON.parse(localStorage.getItem('currentDrone'));


// //   const [drones, setdrones] = useState([]);
// //   const [duplicatedrones, setduplicatedrones] = useState([]);
// //   const [fromdate, setfromdate] = useState('');
// //   const [todate, settodate] = useState('')
// //   const [loading, setloading] = useState(false);
// //   const [searchkey, setsearchkey] = useState('');
// //   const [location, setLocation] = useState('all')
// //   const [searchlockey, setsearchlockey] = useState('');
// //   const[type , settype]=useState('all')

// //   function disabledDate(current) {
// //     // Can not select days before today and today
// //     return current && current < moment().endOf('day');
// //   }

// //   function filterByDate(dates) {
// //     setfromdate(moment(dates[0]).format('MM-DD-YYYY'))
// //     settodate(moment(dates[1]).format('MM-DD-YYYY'))
// //     var temp=[]

// //     function confirmDrone(filtered_drones){
// //       for (var drone of filtered_drones) {
// //         var availability = false;

// //         for (var management of drone.currentbookings) {

// //           if (drone.currentbookings.length) {
// //             if (
// //                 !moment(moment(dates[0]).format('MM-DD-YYYY')).isBetween(management.fromdate, management.todate) &&
// //                 !moment(moment(dates[1]).format('MM-DD-YYYY')).isBetween(management.fromdate, management.todate)
// //             ) {
// //               if (
// //                   moment(dates[0]).format('MM-DD-YYYY') !== management.fromdate &&
// //                   moment(dates[0]).format('MM-DD-YYYY') !== management.todate &&
// //                   moment(dates[1]).format('MM-DD-YYYY') !== management.fromdate &&
// //                   moment(dates[1]).format('MM-DD-YYYY') !== management.todate
// //               ) {
// //                 availability = true;
// //               }
// //             }
// //           }
// //         }
// //         if (availability || drone.currentbookings.length === 0) {
// //           temp.push(drone)
// //         }
// //         setdrones(temp)
// //       }
// //     }

// //     if(dupdate == null && dupdate1 == null && dupdate2 == null) {
// //       confirmDrone(duplicatedrones)
// //     }
// //     else if(dupdate1 == null && dupdate2 == null){
// //       confirmDrone(dupdate)
// //     }
// //     else if((dupdate == null && dupdate2 == null) || dupdate2 == null){
// //       confirmDrone(dupdate1)
// //     }
// //     else{
// //       confirmDrone(dupdate2)
// //     }
// //   }

// //   useEffect(async () => {
// //     try {
// //       setloading(true);
// //       const drones = await (await axios.get("/api/drones/getalldrones")).data;
// //       console.log(drones);
// //       setdrones(drones);
// //       setduplicatedrones(drones)
// //       setloading(false);
// //     } catch (error) {
// //       console.log(error);
// //       setloading(false);
// //     }
// //   }, []);



// //   function filterBySearch()
// //   {
// //     dupdate1 = null;
// //     if(dupdate == null) {
// //       dupdate1 = duplicatedrones.filter(drone => drone.name.toLowerCase().includes(searchkey))
// //       setdrones(dupdate1)
// //     }
// //     else{
// //       dupdate1 = dupdate.filter(room => room.name.toLowerCase().includes(searchkey))
// //       setdrones(dupdate1)
// //     }
// //   }

// //   function filterByLocation(e)
// //   {
// //     dupdate = null;
// //     setLocation(e)
// //     // if(dupdate2 !== null && (dupdate1 !== null || dupdate1 == null)){
// //     //   if(e!=='all'){
// //     //     dupdate = dupdate2.filter(room=>room.location.toLowerCase().includes(e.toLowerCase()))
// //     //     sethotels(dupdate)
// //     //   }
// //     //   else{
// //     //     dupdate = dupdate2
// //     //     sethotels(dupdate)
// //     //   }
// //     // }
// //     if(dupdate2 == null && dupdate1 !== null){
// //       if (e !== 'all') {
// //         dupdate = dupdate1.filter(drone => drone.location.toLowerCase().includes(e.toLowerCase()))
// //         setdrones(dupdate)
// //       } else {
// //         dupdate = dupdate1
// //         setdrones(dupdate)
// //       }
// //     }
// //     if(dupdate1 == null && dupdate2 == null) {
// //       if (e !== 'all') {
// //         dupdate = duplicatedrones.filter(drone => drone.location.toLowerCase().includes(e.toLowerCase()))
// //         setdrones(dupdate)
// //       } else {
// //         dupdate = duplicatedrones
// //         setdrones(dupdate)
// //       }
// //     }
// //   }

  

// //   function filterByType(e)
// //   {
// //     dupdate2 = null;
// //     settype(e)
// //     if(dupdate == null && dupdate1 == null) {
// //       if (e !== 'all') {
// //         dupdate2 = duplicatedrones.filter(drone => drone.type.toLowerCase().includes(e.toLowerCase()))
// //         setdrones(dupdate2)
// //       } else {
// //         dupdate2 = duplicatedrones
// //         setdrones(dupdate2)
// //       }
// //     }
// //     else if(dupdate1 == null){
// //       if (e !== 'all'){
// //         dupdate2 = dupdate.filter(drone => drone.type.toLowerCase().includes(e.toLowerCase()))
// //         setdrones(dupdate2)
// //       } else {
// //       dupdate2 = dupdate
// //       setdrones(dupdate2)
// //       }
// //     }
// //     else {
// //       if (e !== 'all') {
// //         dupdate2 = dupdate1.filter(drone => drone.type.toLowerCase().includes(e.toLowerCase()))
// //         setdrones(dupdate2)
// //       } else {
// //         dupdate2 = dupdate1
// //         setdrones(dupdate2)
// //       }
// //     }
// //   }

// //   return (
// //       <body><div className="mt-5">
// //         <div className="container">
// //           <div className="row bs p-3 m-5">
// //             <div className="col-md-3">

// //               {/* <Select
// //   options={aquaticCreatures}

// //   onChange={e => {setsearchlockey(e.value)}}
// // /> */}
// //               <select className="form-control m-2" value={location} onChange={(e)=>{filterByLocation(e.target.value)}} >

// //                 <option value="all">Select Location</option>
// //                 <option value="Monterey">Monterey</option>
// //                 <option value="san Jose">San Jose</option>
// //                 <option value="san Francisco">San Francisco</option>

// //               </select>
// //             </div>

// //             <div className="col-md-3">
// //               <input
// //                   type="text"
// //                   className="form-control i2 m-2"
// //                   placeholder='Search Drone'
// //                   value={searchkey}
// //                   onKeyUp={filterBySearch}
// //                   onChange={(e)=>{setsearchkey(e.target.value)}}
// //               />
// //             </div>

// //             <div className="col-md-3">
// //               <select className="form-control m-2" value={type} onChange={(e)=>{filterByType(e.target.value)}} >

// //                 <option value="all">Select Drone type</option>
// //                 <option value="suite">DJI MATRICE 200</option>
// //                 <option value="classic">DJI PANTOM</option>
// //                 <option value="classic">Phoenix 6 </option>

// //               </select>
// //             </div>

// //             <div className="col-md-3">
// //               <RangePicker disabledDate={disabledDate} placeholder={["check-in", "check-out"]} style={{ height: "38px" }} onChange={filterByDate} format='MM-DD-YY' className='m-2'/>
// //             </div>

// //           </div>
// //         </div>

        

// //         <div className="row justify-content-center">
// //           {loading ? (
// //               <Loader />
// //           ) : (
// //               drones.map((drone) => {
// //                 return (
// //                     <div className="col-md-8" data-aos='zoom-in'>
// //                       <Drone drone={drone} fromdate={fromdate} todate={todate}/>
// //                     </div>
// //                 );
// //               })
// //           )}
// //         </div>
// //       </div>
// //       </body>


// //   );
// // }

// // export default DroneManagement;