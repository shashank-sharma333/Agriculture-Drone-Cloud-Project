const mongoose = require("mongoose");

const farmerSchema = mongoose.Schema({
    name : {type: String , require},
    phoneNumber : {type: String , require},
    email : {type: String , require},
    birthday : {type: Date , require , default: false},
    gender: {type: String,require, default:"Male"},
    farmAddress: {type: String,require},
    city: {type: String,require},
    country: {type: String,require},
    zipcode: {type: String,require}
} , {
    timestamps : true
})

module.exports = mongoose.model('farmer' , farmerSchema)