const mongoose = require("mongoose")
const Schema = mongoose.Schema

const appointmentSchema = new Schema({
    patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    isVideoCall: { type: Boolean, required: true },
    isCancelled: { type: Boolean, default: false }
})
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;