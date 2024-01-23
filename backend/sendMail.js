const nodemailer = require("nodemailer");
const User = require("./db/user");
const sendMail = async (req, res) => {
    const user = await User.findOne({ email: req.body.email }).lean();
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'swati.mittal.0211@gmail.com',
            pass: 'Swati@Aman',
            clientId: '169401835689-6p4g4pplrqev089l6hmui4h8gir2v3kk.apps.googleusercontent.com',
            clientSecret: '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',
            refreshToken: '1//040Lk2TZricYxCgYIARAAGAQSNwF-L9Ir4_vbJ1pOe-wtQY66QBo9NiS804NhG4FcDIUJ4xKVnxEDNAIuUXBb0vOb_DXff848km4'
        }
    });
    var mailOptions = {
        from: 'swati.mittal.0211@gmail.com',
        to: req.body.email,
        subject: 'Click on the below link',
        html: `<h1>Welcome</h1><p>Click on the below link</p> <a href='http://localhost:3000/reset/${user._id}'>Reset Password</a>`
    };

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send("sent")
        }
    });

}

module.exports = sendMail;