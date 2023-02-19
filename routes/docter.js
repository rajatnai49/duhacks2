const express = require('express')
const passport = require('passport');
const Appointment = require('../models/appointment')
const report = require('../models/prescription')
const Doctor = require('../models/doctor')
const { isLoggedIn } = require('./helper')

const router = express.Router()

router.get('/doctorlogin', (req, res) => {
    const data = {}
    data.user = req.user
    res.render('doctorlogin', { data });
})

router.get('/doctorhome', (req, res) => {
    res.render('doctorhome')
})

// POST
router.post(
    '/doctorlogin',
    passport.authenticate('doctorlocal', {
        successRedirect: '/doctorhome',
        failureRedirect: '/doctorlogin',
    })
)

router.put('/doctorhome/:id/edit', (req, res) => {
    Doctor.findByIdAndUpdate(req.params.id, req.body, req.body, (err, item) => {
        if (err) {
            console.log(err);
            res.redirect('/doctorhome');
        } else {
            console.log(item);
            res.redirect('/doctorhome');
        }
    })
})
module.exports = router