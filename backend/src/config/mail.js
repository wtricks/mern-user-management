import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

// Load environment variables (We don't need to load here vars as we're already loading them in server.js)
dotenv.config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
});

export default transporter