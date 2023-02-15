const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    date: { type: Date, required: true },
    symptoms: { type: String, required: true },
    diagnosis: { type: String, required: true },
    prescription: { type: String, required: true }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;