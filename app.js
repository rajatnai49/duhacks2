const express = require("express")
const bodyParser = require('body-parser');
var cors = require("cors")
let ejs = require('ejs');
const mongoose = require("mongoose")
const app = express()

app.use(bodyParser.json());
app.use(cors())
app.set("view engine", "ejs");
// Routes
app.get("/", (req, res) => {
    res.render('home');
});

const db = require('./database/connection')
db()

const DoctorRoutes = require('./routes/docter');
const PatientRoutes = require('./routes/patient');
app.use(DoctorRoutes)
app.use(PatientRoutes)

app.use("/", () => {
    console.log("Middleware Running");
});

app.listen(3000, () => {
    console.log("Server started at 3000")
})