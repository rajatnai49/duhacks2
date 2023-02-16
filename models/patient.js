const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: "Male" || "Female", required: true },
    address: { type: String, required: true },

});
const Patient = mongoose.model('Patient', doctorSchema);

module.exports = {
    Patient
};