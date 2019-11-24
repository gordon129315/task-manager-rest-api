const sgMail = require("@sendgrid/mail");
console.log("test");

sgMail.setApiKey(process.env.SENDCRID_API_KEY);

sgMail.send({
    to: "golden129315@gmail.com",
    from: "golden129315@gmail.com",
    subject: "Sending with Twilio SendGrid",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>2 and easy to do anywhere, even with Node.js</strong>"
});
