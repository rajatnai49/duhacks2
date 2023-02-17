const express = require('express')
const passport = require('passport');
const Appointment = require('../models/appointment')
const report = require('../models/prescription')
const Doctor = require('../models/doctor')

const router = express.Router()

router.get('/patientregistration', (req, res) => {
    const data = {};
    data.user = req.user;
    data.NODE_ENV = process.env.NODE_ENV;
    res.render('patientregistration', { data });
});

router.get('/patientlogin', (req, res) => {
    const data = {};
    data.user = req.user;
    data.NODE_ENV = process.env.NODE_ENV;
    res.render('patientlogin', { data });
});
router.get('/patienthome', (req, res) => { })
router.get('/patienthome/book/:patientid', (req, res) => {

})
router.get('/patienthome/book/:patientid/:disease', (req, res) => {

})
router.get('/patienthome/book/:patientid/:disease/:doctorid', (req, res) => {

})

// POST
router.post('/patienthome/book/:patientid', (req, res) => {

})
router.post('/patienthome/book/:patientid/:disease/:doctorid', (req, res) => {

})