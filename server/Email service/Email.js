const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

//? creating the transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_User,
    pass: process.env.GMAIL_Pw,
  },
});

const sendEmail = async (to, subject, body) => {
  let mailOptions = {
    to,
    from: process.env.GMAIL_User,
    subject,
    html: body,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, res) => {
      if (err) {
        console.log("email not sent");
        console.log(err);
        reject(err);
      } else {
        console.log("email sent");

        console.log(res);
        resolve(res);
      }
    });
  });
};
module.exports = sendEmail;
