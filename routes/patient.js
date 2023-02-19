const express = require('express')
const nodemailer = require('nodemailer')
const passport = require('passport');
const Appointment = require('../models/appointment')
const Doctor = require('../models/doctor')
const Patient = require('../models/patient')
const {
    ConvertChosenTime,
    convert,
    isLoggedIn,
    isAuthorizedPatient,
} = require('./helper');
const router = express.Router()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "medigo777@gmail.com",
        pass: "adfhbsdtrhgrsoqi"
    }
});

// GET
router.get('/patientregistration', (req, res) => {
    const data = {};
    data.user = req.user;
    res.render('patientregistration', { data });
});

router.get('/patientlogin', (req, res) => {
    const data = {};
    data.user = req.user;
    res.render('patientlogin', { data });
});

router.get('/patienthome', isLoggedIn, (req, res) => {
    const appointmentarray = [];
    const data = {};
    const SortPatientPromise = new Promise((resolve, reject) => {
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
    SortPatientPromise.then((result) => {
        result.forEach((item) => {
            const obj = {}
            obj.PatientId = item.PatientId;
            obj.name = item.DoctorId.name;
            obj.email = item.DoctorId.username;
            obj.AppointmentDate = item.AppointmentDate;
            appointmentarray.push(obj);
        });
    }).catch((error) => {
        console.log(`Error From promise 1 a) ${error}`);
    });
    Promise.all([SortPatientPromise])
        .then((result) => {
            data.appointmentarray = appointmentarray;
            data.user = req.user;
            console.log(data);
            res.render('patienthome', { data });
        })
        .catch((error) => {
            console.log(`Error From promise 1 c) ${error}`);
        });
})


// +Add isAuthorizedPatient

router.get('/patienthome/book/:patientid/:disease', (req, res) => {
    const docpromise = new Promise((resolve, reject) => {
        Doctor
            .find({ specialization: req.params.disease })
            .exec((err, item) => {
                if (err) {
                    console.log('error in updating patient data');
                    reject(err);
                }
                else {
                    resolve(item)
                }
            })
    })
    docpromise
        .then((result) => {
            const data = {}
            data.user = req.user
            data.patientid = req.params.patientid
            data.patientdisease = req.params.disease
            data.doctor = result
            res.render('appointmentbooking1', { data })
        })
        .catch((err) => {
            console.log('appointment1 error')
        })
})
router.post('/patienthome/book/:patientid/:disease/:doctorid', (req, res) => {
    const data = {}
    data.user = req.user
    const appointment = new Appointment({
        PatientId: req.params.patientid,
        DoctorId: req.params.doctorid,
        AppointmentDate: req.body.date
    })
    appointment.save((err) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: 'Error saving appointment' });
        } else {
            res.send({ message: 'Appointment created successfully' });
        }
    });

    Doctor.findById(req.params.doctorid, (err, doctor) => {
        if (err) {
            console.log(`Error finding doctor: ${err}`);
            return;
        }
        const doctorEmail = doctor.username;
        console.log(`Doctor email: ${doctorEmail}`);

        transporter.sendMail({
            from: 'medigo777@gmail.com', // sender address
            to: doctorEmail, // list of receivers
            subject: 'Appointment Details', // Subject line
            html: `<p>Patient Name: ${req.user.name}</p>
                    <p>Appointment date: ${req.body.date}</p>` // email body 
        }, (error, info) => {
            if (error) {
                console.log(`Error sending email: ${error}`);
            } else {
                console.log(`Email sent: ${info.response}`);
                res.send("Appointent book successfully.")
            }
        });
    });

});
router.get('/patienthome/book/:patientid/:disease', (req, res) => {
    const docpromise = new Promise((resolve, reject) => {
        Doctor
            .find({ specialization: req.params.disease })
            .exec((err, item) => {
                if (err) {
                    console.log('error in updating patient data');
                    reject(err);
                }
                else {
                    resolve(item)
                }
            })
    })
    docpromise
        .then((result) => {
            const data = {}
            data.user = req.user
            data.patientid = req.params.patientid
            data.patientdisease = req.params.disease
            data.doctor = result
            res.render('appointmentbooking1', { data })
        })
        .catch((err) => {
            console.log('appointment1 error')
        })
})

// POST
router.post('/patientlogin',
    passport.authenticate('patientlocal', {
        successRedirect: '/patienthome',
        failureRedirect: '/patientlogin',
    })
)
router.post('/patientregistration', (req, res) => {
    const temp = new Patient({
        username: req.body.username,
        usertype: 'patient',
        name: req.body.name,
        dob: req.body.dob,
        phone: req.body.phone,
        state: req.body.state,
        city: req.body.city,
    });

    Patient.register(temp, req.body.password, (err, item) => {
        if (err) {
            console.log(err);
            const data = {};
            data.user = req.user;
            res.render('patientregistration', { data });
        }
        console.log(item);
        passport.authenticate('patientlocal')(req, res, () => {
            res.redirect('/patienthome');
        });
    });
});
router.post('/patienthome/book/:patientid', (req, res) => {

})
router.post('/patienthome/book/:patientid/:disease/:doctorid', (req, res) => {

})

// PUT
module.exports = router