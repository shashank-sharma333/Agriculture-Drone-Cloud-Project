const express = require("express");
const router = express.Router();
const Farmer = require("../models/farmer")
const Pilot = require("../models/pilot")

module.exports = router ;

router.post("/farmerDetails", async(req, res) => {
  
    const {name,phoneNumber,email,birthday,gender,farmAddress,city,country,zipcode,plotType,
        typeDetail,
        landOwner,
        landAddress,
        landCity,
        landCountry,
        landZipcode,
        totalArea,
        certificateDate,
        certificateLink,
        driverName,
        licenseId,
        certificate} = req.body

    console.log(name)
    console.log(phoneNumber)
    console.log(email)
    console.log(birthday)
    console.log(gender)
    console.log(farmAddress)
    console.log(city)
    console.log(country)
    console.log(zipcode)

    const newUser = new Farmer({name,phoneNumber,email,birthday,gender,farmAddress,city,country,zipcode,plotType,
        typeDetail,
        landOwner,
        landAddress,
        landCity,
        landCountry,
        landZipcode,
        totalArea,
        certificateDate,
        certificateLink,
        driverName,
        licenseId,
        certificate})

    try {
        newUser.save()
        console.log("Saved")
        res.send('Farmer Details saved successfully')
    } catch (error) {
         return res.status(400).json({ message: error });
    }

});

router.post("/farmDetails", async(req, res) => {
  
    const {name,phoneNumber,email,birthday,gender} = req.body
    
    console.log(name)
    console.log(phoneNumber)
    console.log(email)
    console.log(birthday)
    console.log(gender)

    const newUser = new Farmer({name,phoneNumber,email,birthday,gender})

    try {
        newUser.save()
        res.send('Farmer Details saved successfully')
    } catch (error) {
         return res.status(400).json({ message: error });
    }

});

router.post("/pilotDetails", async(req, res) => {
  
    const {name,phoneNumber,email,birthday,gender,certificateId,
        pilotName,
        country,
        address,  
        city,
        driverName,
        licenseId} = req.body
    
    console.log(name)
    console.log(phoneNumber)
    console.log(email)
    console.log(birthday)
    console.log(gender)

    

    const newUser = new Pilot({name,phoneNumber,email,birthday,gender,certificateId,
        pilotName,
        country,
        address,  
        city,
        driverName,
        licenseId})

    try {
        newUser.save()
        res.send('Farmer Details saved successfully')
    } catch (error) {
         return res.status(400).json({ message: error });
    }

});