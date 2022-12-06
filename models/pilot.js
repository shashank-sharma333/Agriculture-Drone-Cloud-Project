const mongoose = require("mongoose");

const pilotSchema = mongoose.Schema({
    name : {type: String , require},
    phoneNumber : {type: String , require},
    email : {type: String , require},
    birthday : {type: Date , require , default: false},
    gender: {type: String,require, default:"Male"},
    certificateId: {type: String,require, default:""},
    pilotName: {type: String,require, default:""},
    country: {type: String,require, default:""},
    address: {type: String,require, default:""},
    city: {type: String,require, default:""},
    driverName: {type: String,require, default:""},
    licenseId: {type: String,require, default:""}
} , {
    timestamps : true
})

module.exports = mongoose.model('pilot' , pilotSchema)