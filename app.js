const express = require("express")
var cors = require("cors")
const mongoose = require("mongoose")
const app = express()
const db = require('./database/connection')
app.use(cors())
db()
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.get("/", (req, res) => {
    res.render('/views/login.js')
});

app.listen(3000, () => {
    console.log("Server started...")
})