import { verificationCode } from './template';

const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

let transporter = nodemailer.createTransport({
  host: dotenv.parsed.SMTP_HOST,
  port: dotenv.parsed.SMTP_CODE,
  secure: true,
  auth: {
    user: dotenv.parsed.SMTP_MAIL,
    pass: dotenv.parsed.SMTP_MAIL_PASSSWORD,
  },
});

export const sendVerificationCode = async (to, code) => {
  let mail = await transporter.sendMail({
    from: `e-shopping <${dotenv.parsed.SMTP_MAIL}>`,
    to,
    subject: 'E-mail Verification',
    html: verificationCode(code),
  });

  return mail;
};
