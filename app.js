const express = require("express")
const methodOverride = require('method-override');
const bodyParser = require('body-parser')
const LocalStrategy = require('passport-local')
const passport = require('passport');
const Patient = require('./models/patient');
const Doctor = require('./models/doctor');
const session = require('cookie-session');
const DoctorRoutes = require('./routes/docter');
const PatientRoutes = require('./routes/patient');
const IndexRoutes = require('./routes/index');

const app = express()
app.use(express.static("public"));
// db config
const db = require('./database/connection')
db()

// templates
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true, useNewUrlParser: true }))
app.use(methodOverride('_method'))

// passport.js
app.use(session({
    secret: 'Hakuna mata taa...!',
    resave: false,
    saveUninitialized: false,
})
);

app.use(passport.initialize());
app.use(passport.session());

passport.use('doctorlocal', new LocalStrategy(Doctor.authenticate()));
passport.use('patientlocal', new LocalStrategy(Patient.authenticate()));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Patient.findById(id, (err, patient) => {
        if (err) return done(err, null);
        if (patient) return done(null, patient);
        Doctor.findById(id, (error, doctor) => {
            if (error) return done(error, null);
            if (doctor) return done(null, doctor);
        });
    });
});

app.use(IndexRoutes)
app.use(PatientRoutes)
app.use(DoctorRoutes)

app.listen(3000, () => {
    console.log("Server started at 3000")
})