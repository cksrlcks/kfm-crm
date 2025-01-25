import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: process.env.NODE_MAIL_SERVICE,
  host: process.env.NODE_MAIL_HOST,
  port: Number(process.env.NODE_MAIL_PORT),
  auth: {
    user: process.env.NODE_MAIL_USER,
    pass: process.env.NODE_MAIL_PASSWORD,
  },
});
