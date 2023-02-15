const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    specialty: { type: String, required: true },
    appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }]
});
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = {
    Doctor
};