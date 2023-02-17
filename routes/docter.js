const express = require('express')
const passport = require('passport');
const Appointment = require('../models/appointment')
const report = require('../models/prescription')
const Doctor = require('../models/doctor')


const router = express.Router()

// GET
router.get('/doctorlogin', (req, res) => {
    res.render('doctorlogin');
})

//Post
router.post('/doctorlogin', (req, res) => {
    console.log(req.email);
    res.render('doctorhome');
})

router.get('/doctorhome', (req, res) => {

})
// POST


module.exports = router