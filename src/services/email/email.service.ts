import nodemailer from 'nodemailer';
import { ApiError } from '../../utils/api-error';

export const createEmailTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '2525'),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendEmail = async (
  to: string,
  subject: string,
  content: string
) => {
  try {
    const transporter = createEmailTransporter();
    const mailOptions = {
      from: `"HappyDot Team" <${process.env.FROM_EMAIL_ID}>`,
      to,
      subject: subject,
      html: content,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new ApiError(500, 'Unable to send email');
  }
};
