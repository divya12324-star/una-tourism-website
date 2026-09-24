const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// contact API
app.post("/contact", async (req, res) => {

    const { name, email, phone, subject, message } = req.body;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "divyadhiman728@gmail.com",      // 👈 apna email
            pass: "prpq muri bdyj fzri"          // 👈 app password
        }
    });

    let mailOptions = {
        from: email,
        to: "divyadhiman728@gmail.com",          // 👈 jahan email chahiye
        subject: subject,
        text: `
Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});

// server start
app.listen(5000, () => {
    console.log("Server running on port 5000");
});