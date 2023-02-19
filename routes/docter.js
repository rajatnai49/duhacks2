const express = require('express')
const passport = require('passport');
const Appointment = require('../models/appointment')
const report = require('../models/prescription')
const Doctor = require('../models/doctor')
const { isLoggedIn } = require('./helper')

const router = express.Router()
router.get('/doctorregistration', (req, res) => {
    const data = {};
    data.user = req.user;
    res.render('doctorregistration', { data });
})
router.post('/doctorregistration', (req, res) => {
    const temp = new Doctor({
        username: req.body.username,
        usertype: req.body.usertype,
        name: req.body.name,
        phone: req.body.phone,
        specialization: req.body.specialization,
        address: req.body.address,
    });

    Doctor.register(temp, req.body.password, (err, item) => {
        if (err) {
            console.log(err);
            const data = {};
            data.user = req.user;
            console.log(item);
            res.render('doctorregistration', { data });
        }
        passport.authenticate('doctorlocal')(req, res, () => {
            res.send("created")
            // res.redirect('/doctorhome');
        });
    });
});
router.get('/doctorlogin', (req, res) => {
    const data = {}
    data.user = req.user
    res.render('doctorlogin', { data });
})

router.get('/doctorhome', (req, res) => {
    const appointmentarray = [];
    const data = {};
    const SortdoctorPromise = new Promise((resolve, reject) => {
        Appointment.find()
            .populate('PatientId DoctorId')
            .exec((err, appointments) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(appointments);
                }
            });
    });
    SortdoctorPromise.then((result) => {
        result.forEach((item) => {
            const obj = {}
            obj.PatientId = item.PatientId;
            obj.name = item.PatientId.name;
            obj.email = item.PatientId.username;
            obj.AppointmentDate = item.AppointmentDate;
            appointmentarray.push(obj);
        });
    }).catch((error) => {
        console.log(`Error From promise 1 a) ${error}`);
    });
    Promise.all([SortdoctorPromise])
        .then((result) => {
            data.appointmentarray = appointmentarray;
            data.user = req.user;
            console.log(data);
            res.render('doctorhome', { data });
        })
        .catch((error) => {
            console.log(`Error From promise 1 c) ${error}`);
        });
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