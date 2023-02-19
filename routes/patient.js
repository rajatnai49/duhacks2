const express = require('express')
const passport = require('passport');
const Appointment = require('../models/appointment')
const report = require('../models/prescription')
const Doctor = require('../models/doctor')
const Patient = require('../models/patient')
const {
    ConvertChosenTime,
    convert,
    isLoggedIn,
    isAuthorizedPatient,
} = require('./helper');
const router = express.Router()

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

router.get('/patienthome', (req, res) => {


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
            console.log(result)
            res.render('appointmentbooking1', { data })
        })
        .catch((err) => {
            console.log('appointment1 error')
        })
})
router.get('/patienthome/book/:patientid/:disease/:doctorid', (req, res) => {
    const data = {}
    data.user = req.user
    data.patientid = req.params.patientid
    data.disease = req.params.disease
    data.doctorid = req.params.doctorid
    res.render('appointmentbooking2', { data })
}
);
router.post('/patienthome/book/:patientid/:disease/:doctorid', (req, res) => {

}
);
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