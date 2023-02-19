const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    PatientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
    },
    DoctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
    },
    AppointmentDate: {
        type: String,
        default: 'none',
    }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);