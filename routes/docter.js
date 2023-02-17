const express = require('express')
const passport = require('passport');
const Appointment = require('../models/appointment')
const report = require('../models/prescription')
const Doctor = require('../models/doctor')

const router = express.Router()

// GET
router.get('/doctorlogin', (req, res) => {
    const data = {}
    data.user = req.user
    console.log(res);
    console.log(req);
    res.render('doctorlogin', { data })
})

router.get('/doctorhome', (req, res) => {

})
// POST


module.exports = router