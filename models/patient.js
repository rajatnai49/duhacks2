const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const patientSchema = new mongoose.Schema({
    username: String,
    usertype: {
        type: String,
        default: 'patient',
    },
    name: String,
    dob: Date,
    phone: Number,
    state: String,
    city: String,
    password: String,
});

patientSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Patient', patientSchema);