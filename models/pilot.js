const mongoose = require("mongoose");

const pilotSchema = mongoose.Schema({
    name : {type: String , require},
    phoneNumber : {type: String , require},
    email : {type: String , require},
    birthday : {type: Date , require , default: false},
    gender: {type: String,require, default:"Male"},
    pilotCertificateId: {type: String,require, default:""},
    drivingLicenseNumber: {type: String,require, default:""}
} , {
    timestamps : true
})

module.exports = mongoose.model('pilot' , pilotSchema)