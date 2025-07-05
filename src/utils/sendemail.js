const nodemailer = require('nodemailer');

const sendEmail = async ({emailTo, subject, code, text}) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const message = {
    to: emailTo,
    subject,
    text,
    html: `<p>Use this bellow code to ${text}</p><p>Your verification code is: <strong>${code}</strong></p>`,
  };

  try {
    const info = await transporter.sendMail(message);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;
