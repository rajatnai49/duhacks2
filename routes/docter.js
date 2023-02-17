const express = require('express')
const passport = require('passport');
const Appointment = require('../models/appointment')
const report = require('../models/prescription')
const Doctor = require('../models/doctor')


const router = express.Router()

// GET
router.get('/doctorregistration', (req, res) => {
    const data = {};
    data.user = req.user;
    res.render('doctorregistration', { data });
})
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
router.post('/doctorregistration', (req, res) => {
    const nux = new Doctor({
        username: req.body.username,
        usertype: req.body.usertype,
        name: req.body.name,
        phone: req.body.phone,
        specialization: req.body.specialization,
        address: req.body.address,
    });

    Doctor.register(nux, req.body.password, (err, item) => {
        if (err) {
            console.log(err);
            const data = {};
            data.user = req.user;
            data.NODE_ENV = process.env.NODE_ENV;
            console.log(item);
            res.render('doctorregistration', { data });
        }
        passport.authenticate('doctorlocal')(req, res, () => {
            res.send("created")
        });
    });
});

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