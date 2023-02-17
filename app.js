const express = require("express")
const bodyParser = require('body-parser');
var cors = require("cors")
const mongoose = require("mongoose")
const app = express()

app.use(bodyParser.json());
app.use(cors())
// Routes
app.get("/", (req, res) => {
    res.send("We are live!");
});

const db = require('./database/connection')
db()

const DoctorRoutes = require('./routes/docter');
app.use(DoctorRoutes)
app.use("/", () => {
    console.log("Middleware Running");
});

app.listen(3000, () => {
    console.log("Server started...")
})