const express = require('express')
const passport = require('passport');
const Appointment = require('../models/appointment')
const report = require('../models/report')
const Doctor = require('../models/doctor')

const router = express.Router()

router.post('/doctorlogin', (req, res) => {
    console.log(res)
}
);