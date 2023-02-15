const express = require("express")
var cors = require("cors")
const mongoose = require("mongoose")
const app = express()
app.use(cors())

app.get("/", (req, res) => {
    res.send("We are live!");
});

app.listen(6969, () => {
    console.log("Server started...")
})