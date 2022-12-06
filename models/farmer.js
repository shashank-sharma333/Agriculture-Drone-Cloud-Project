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
    zipcode: {type: String,require},
    plotType: {type: String,require},
    typeDetail: {type: String,require},
    landOwner: {type: String,require},
    landAddress: {type: String,require},
    landCity: {type: String,require},
    landCountry: {type: String,require},
    landZipcode: {type: String,require},
    totalArea: {type: String,require},
    certificateDate: {type: String,require},
    certificateLink: {type: String,require},
    driverName: {type: String,require},
    licenseId: {type: String,require},
    certificate:{type: String,require,default:false}
} , {
    timestamps : true
})

module.exports = mongoose.model('farmer' , farmerSchema)