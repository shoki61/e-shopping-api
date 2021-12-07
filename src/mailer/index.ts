import { verificationCode } from './template';

const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_CODE,
  secure: true,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_MAIL_PASSSWORD,
  },
});

export const sendVerificationCode = async (to, code) => {
  let mail = await transporter.sendMail({
    from: `e-shopping <${process.env.SMTP_MAIL}>`,
    to,
    subject: 'E-mail Verification',
    html: verificationCode(code),
  });

  return mail;
};
