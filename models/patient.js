const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const patientSchema = new mongoose.Schema({
    username: String,
    usertype: {
        type: String,
        default: 'patient',
    },
    name: String,
    //change String -> Date
    dob: Date,
    //change String -> Number
    phone: Number,
    //address: String,
    //dividing address into multiple fields
    nation: String,
    state: String,
    city: String,
    password: String,
    // date: String,
});

patientSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Patient', patientSchema);