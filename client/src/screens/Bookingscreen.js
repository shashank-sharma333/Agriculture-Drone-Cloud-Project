import React, { useEffect, useState } from 'react'
import axios from "axios";
import Swal from 'sweetalert2'
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from '../components/Success'
import StripeCheckout from 'react-stripe-checkout'
import {Routes, Route, useHistory} from "react-router-dom";
import moment from "moment"
import AOS from 'aos';
import 'aos/dist/aos.css';


import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

AOS.init();
AOS.refresh()

function Bookingscreen({ match }) {
    // var user_logged = JSON.parse(localStorage.getItem('currentUser')).name
    // // console.log(user_logged)
    // function userLogged(user_logged){
    //     if(user_logged == null){
    //         // Swal.fire('Please login or register').then(result => {
    //             window.location.href = '/login'
    //         // })
    //     }
    // }
    //
    // userLogged(user_logged)

  
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(false)
    const [success, setsuccess] = useState(false)
    const [room, setroom] = useState()
    const roomid = match.params.roomid
    const fromdate = moment(match.params.fromdate, 'MM-DD-YYYY')
    const todate = moment(match.params.todate, 'MM-DD-YYYY')
    const totalDays = moment.duration(todate.diff(fromdate)).asDays() + 1
    const [totalAmount, settotalAmount] = useState(0)
    const [surgePricingMessage, setSurgePricingMessage] = useState('')
    const [summerPricingMessage, setSummerPricingMessage] = useState('')
    const [christmasPricingMessage, setChristmasPricingMessage] = useState('')
    const [rewards, setRewards] = useState([]);
    const [checked, setChecked] = useState(false);
    const [isWeekendPresent, setIsWeekend] = useState(false);
    const [weekendAdditonalCharges, setWeekendAdditionalCharges] = useState(0);
    const [isSummerPricingApplied, setIsSummerPricingApplied] = useState(false);
    const [summerAdditionalCharges, setSummerAdditionalCharges] = useState(0);
    const [isChristmasPricingApplied, setIsChristmasPricingApplied] = useState(false);
    const [christmasAdditionalCharges, setChristmasAdditionalCharges] = useState(0);

    const [dailyContinentalBreakfast, setDailyContinentalBreakfast] = useState(false);
    const [accessToFitnessRoom, setAccessToFitnessRoom] = useState(false);
    const [accessToSwimmingPoolJacuzzi, setAccessToSwimmingPoolJacuzzi] = useState(false);
    const [accessToDailyParking, setAccessToDailyParking] = useState(false);
    const [accessToAllMealsIncluded, setAccessToAllMealsIncluded] = useState(false);
    const navigate = useHistory();

    const navigateToHome = () => {
        // 👇️ navigate to /contacts
        navigate.push('/home');
    }
    

    function isWeekend(date1, date2) {
        var d1 = new Date(date1),
            d2 = new Date(date2),
            isWeekend = false;

        console.log("d1: " + d1);
        console.log("d2: " + d2);
        while (d1 < d2) {
            var day = d1.getDay();
            isWeekend = (day === 6) || (day === 0);
            if (isWeekend) {
                return true;
            } // return immediately if weekend found
            d1.setDate(d1.getDate() + 1);
        }
        return false;
    }

    function isInMay(from) {

        var fDate;
        fDate = new Date(from);
        console.log("fDate month: " + fDate.getMonth())

        if (fDate.getMonth() == 4) {
            return true;
        }
        return false;
    }

    function isInDecember(from) {

        var fDate;
        fDate = new Date(from);


        if (fDate.getMonth() == 11) {
            return true;
        }
        return false;
    }

    function dateCheck(from, to, check) {

        var fDate, lDate, cDate;
        fDate = Date.parse(from);
        lDate = Date.parse(to);
        cDate = Date.parse(check);


        if ((cDate <= lDate && cDate >= fDate)) {
            return true;
        }
        return false;
    }

 


    useEffect(async () => {

        try {
            setloading(true);
            const data = await (await axios.post("/api/rooms/getroombyid", {roomid})).data;
            console.log(data);
            setroom(data);
            setloading(false);
            console.log("fromdate: " + match.params.fromdate);
            console.log("todate: " + match.params.todate);
            console.log("isWeekend: " + isWeekend(match.params.fromdate, match.params.todate));
            var isWeekendIdentified = isWeekend(fromdate, todate);
            console.log("isWeekendIdentified: " + isWeekendIdentified);
            setIsWeekend(isWeekendIdentified);
            var isSummerPricingApplied = isInMay(fromdate);
            console.log("isSummerPricingApplied: " + isSummerPricingApplied);

            setIsSummerPricingApplied(isSummerPricingApplied);


            var isChristmasPricingApplied = isInDecember(fromdate);
            console.log("isChristmasPricingApplied: " + isChristmasPricingApplied);
            setIsChristmasPricingApplied(isChristmasPricingApplied);

            var totalAmount = data.rentperday * totalDays;
            var totalAmountBefore = totalAmount;

           
           


           

            settotalAmount(totalAmount)

            var retrievedData = JSON.parse(localStorage.getItem('currentUser'));
            console.log(retrievedData.email)
            const req = await axios.post('/api/users/rewards', {email: retrievedData.email});
            var reqdata = req.data;
            console.log(reqdata[0].rewards);
            setRewards(reqdata[0].rewards);

        } catch (error) {
            console.log(error);
            setloading(false);
        }

    }, [])


    async function tokenHander(token) {

        console.log(token);
        const bookingDetails = {

            token,
            user: JSON.parse(localStorage.getItem('currentUser')),
            room,
            fromdate,
            todate,
            totalDays,
            totalAmount

        }

        async function updateData() {
            var retrievedData = JSON.parse(localStorage.getItem('currentUser'));
            console.log(retrievedData.email)

            
            const req = await axios.post('/api/users/rewards', { email: retrievedData.email });

            var reqdata = req.data;
            
            console.log(reqdata[0].rewards);
            setRewards(reqdata[0].rewards);
            var reqdata2 = reqdata[0].rewards;

            if(checked === true){
                //reqdata2 = reqdata2 - 100;
                axios.put('/api/users/reducereward',{email:reqdata[0].email,reward: reqdata2});
                
            }
            else{
                const req2 = axios.put('/api/users/updatereward',{email:reqdata[0].email,reward: reqdata2});
            
        }
          }


        try {
            setloading(true);
            const result = await axios.post('/api/bookings/bookroom', bookingDetails)
            updateData();
            setloading(false)
            Swal.fire('Congrats', 'Your Drone has booked successfully', 'success').then(result => {


                window.location.href = '/profile'
            })
        } catch (error) {
            console.log(error);
            setloading(false)
            Swal.fire('Oops', 'Something went wrong , please try later', 'error')
        }

    }


    const handleChange = () => {
        console.log("checked:" + checked);
        setChecked(!checked);
        console.log(checked);

        var retrievedData = JSON.parse(localStorage.getItem('currentUser'));
        const req = axios.post('/api/users/rewards', { email: retrievedData.email });
        var reqdata = req.data;
        
        console.log(reqdata[0].rewards);

        if (checked == false && reqdata[0].rewards>=100) {
            settotalAmount(totalAmount - 100);
        } else {
            settotalAmount(totalAmount + 100);
        }

    };

    const handleChangeDailyContinentalBreakfast = () => {
        var dailyContinentalBreakfast = document.getElementById("dailyContinentalBreakfast").checked;
        setDailyContinentalBreakfast(!dailyContinentalBreakfast);
        console.log("dailyContinentalBreakfast:" + dailyContinentalBreakfast);
        if (dailyContinentalBreakfast == false) {
            settotalAmount(totalAmount - 10);
        } else {
            settotalAmount(totalAmount + 10);
        }

    };

    const handleChangeAccessToFitnessRoom = () => {
        var accessToFitnessRoom = document.getElementById("accessToFitnessRoom").checked;
        setAccessToFitnessRoom(!accessToFitnessRoom);
        console.log("accessToFitnessRoom:" + accessToFitnessRoom);
        if (accessToFitnessRoom == false) {
            settotalAmount(totalAmount - 15);
        } else {
            settotalAmount(totalAmount + 15);
        }

    };

    const handleChangeToSwimmingPoolOrJacuzzi = () => {
        var accessToSwimmingPoolJacuzzi = document.getElementById("accessToSwimmingPoolJacuzzi").checked;
        setAccessToSwimmingPoolJacuzzi(!accessToSwimmingPoolJacuzzi);
        console.log("accessToSwimmingPoolJacuzzi:" + accessToSwimmingPoolJacuzzi);
        if (accessToSwimmingPoolJacuzzi == false) {
            settotalAmount(totalAmount - 18);
        } else {
            settotalAmount(totalAmount + 18);
        }

    };

    const handleChangeToDailyParking = () => {
        var accessToDailyParking = document.getElementById("accessToDailyParking").checked;
        setAccessToDailyParking(!accessToDailyParking);
        console.log("accessToDailyParking:" + accessToDailyParking);
        if (accessToDailyParking == false) {
            settotalAmount(totalAmount - 20);
        } else {
            settotalAmount(totalAmount + 20);
        }

    };

    const handleChangetoAllMealsIncluded = () => {
        var accessToAllMealsIncluded = document.getElementById("accessToAllMealsIncluded").checked;

        console.log("accessToAllMealsIncluded:" + accessToAllMealsIncluded);
        setAccessToAllMealsIncluded(!accessToAllMealsIncluded);
        console.log("accessToAllMealsIncluded:" + accessToAllMealsIncluded);
        if (accessToAllMealsIncluded == false) {
            settotalAmount(totalAmount - 25);
        } else {
            settotalAmount(totalAmount + 25);
        }

    };

    const navigateToHomeScreen = () => {
    // 👇️ navigate to /contacts
    navigate.push('/');
};

    return (
        <div className='m-5'>

            {loading ? (<Loader/>) : error ? (<Error/>) : (

                <div className="row p-3 mb-5 bs" data-aos='flip-right' duration='2000'>

                    <div className="col-md-4 ">

                        <div>
                            <h1> {room.name}</h1>
                            <img src={room.imageurls[0]} style={{height: '400px'}}/>
                        </div>

                    </div>
                    
                    <div className="row-md-2 ">

                        <div>
                            <h1>West Plot A</h1>
                            <img src="https://images.pexels.com/photos/96715/pexels-photo-96715.jpeg?auto=compress&cs=tinysrgb&w=1600" style={{width: '50px',height: '120px'}}/>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" ></input>
                                     <label class="form-check-label" for="flexRadioDefault1">
                                     Crop 1
                                    </label>
                                </div>
                                
                        </div>
                        <div>
                            <h1> East Plot B</h1>
                            <img src="https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=1600" style={{width: '50px',height: '120px'}}/>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"></input>
                                     <label class="form-check-label" for="flexRadioDefault1">
                                     Crop 2
                                    </label>
                                </div>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="row-md-2 ">
                        <div>
                            <h1> South Plot C</h1>
                            <img src="https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=1600" style={{width: '50px',height: '120px'}}/>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"></input>
                                     <label class="form-check-label" for="flexRadioDefault1">
                                     Crop 3
                                    </label>
                                </div>
                        </div>
                        <div>
                            <h1> North Plot D</h1>
                            <img src="https://images.pexels.com/photos/235725/pexels-photo-235725.jpeg?auto=compress&cs=tinysrgb&w=1600" style={{width: '50px',height: '120px'}}/>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"></input>
                                     <label class="form-check-label" for="flexRadioDefault1">
                                     Crop 4
                                    </label>
                                </div>
                        </div>

                    </div>
                    
                    <div className="col-md-4 text-right">
                        <div>
                            <h1><b>Booking Details</b></h1>
                            <hr/>

                            <p><b>Name</b> : {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                            <p><b>Service-Start</b> : {match.params.fromdate}</p>
                            <p><b>Service-end</b> : {match.params.todate}</p>
                           

                        </div>
                        <div class="form-check form-check-inline">
                            <input type="checkbox" id="rewards" onChange={handleChange} name="rewards"
                                   align="left"/>
                        </div>

                        <br></br>
                        <br></br>
                        <br></br>
                        
                        
                      

                        <br></br>
                        <div className='mt-5'>
                            <h1><b>Amount</b></h1>
                            <hr/>
                            
                            <p> Drone Rent Per Day : <b>{room.rentperday}</b></p>
                            <h1><b>Total Amount : {totalAmount} /-</b></h1>
                            <button onClick={navigateToHome} className="btn btn-primary">Back</button>
                            &nbsp;
                            <StripeCheckout
                                amount={totalAmount * 100}
                                shippingAddress
                                token={tokenHander}
                                stripeKey='pk_test_51IYnC0SIR2AbPxU0TMStZwFUoaDZle9yXVygpVIzg36LdpO8aSG8B9j2C0AikiQw2YyCI8n4faFYQI5uG3Nk5EGQ00lCfjXYvZ'
                                currency='USD'
                            >

                                <button className='btn btn-primary'>Pay Now</button>
                            </StripeCheckout>

                        </div>


                    </div>

                </div>

            )}

        </div>
    )
}

export default Bookingscreen;
