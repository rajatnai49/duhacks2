const express = require('express')
const passport = require('passport');
const Appointment = require('../models/appointment')
const report = require('../models/prescription')
const Doctor = require('../models/doctor')
const Patient = require('../models/patient')

const router = express.Router()

router.get('/patientregistration', (req, res) => {
    res.render('patientregistration');
});

router.get('/patientlogin', (req, res) => {
    res.render('patientlogin');
});

router.post('/patientregistration', async (req, res) => {
    const patient = await Patient.create({
        username: req.body.username,
        name: req.body.name,
        dob: req.body.dob,
        phoneno: req.body.phoneno,
        state: req.body.state,
        city: req.body.city,
        password: req.body.password
    })
    return res.status(200).json(patient);
});

router.post('/patientlogin', async (req, res) => {
    try {
        const patient = await Patient.findOne({
            username: req.body.username
        });
        if (patient) {
            const result = req.body.password === patient.password;
            if (result) {
                res.render("patienthome");
            } else {
                res.status(400).json({ error: "password doesn't match" });
            }
        } else {
            res.status(400).json({ error: "user don't exit" });
        }
    }
    catch (error) {
        res.status(400).json({ error });
    }
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/patienthome");
}

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

module.exports = router