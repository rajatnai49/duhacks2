const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: "false",
    host: "gmail.com",
    auth: {
        user: "",
        pass: ""
    },
});

const options = {
    from: "",
    to: "",
    subject: "",
    text: ""
};

transporter.sendMail(options, function (err, info) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("sent: " + info.response);
})