require("dotenv").config();
const nodemailer = require("nodemailer");

class Email {
  constructor(user, url) {
    this.from = process.env.EMAIL_FROM;
    this.to = user.email;
    this.url = url;
  }
  newTransporter() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  async send(template, subject) {
    // 1) Render HTML based on a pug template

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,

      text: `${this.url}`,
    };

    // 3) Create a transport and send email
    await this.newTransporter().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the Natours Family!");
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token (valid for only 10 minutes)"
    );
  }
}

module.exports = Email;
