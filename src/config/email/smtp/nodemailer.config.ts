import nodemailer from 'nodemailer';

import { ENV_VALUES } from '../../env/env.config';

export const transporter = nodemailer.createTransport({
  host: ENV_VALUES.SMTP_HOST,
  port: ENV_VALUES.SMTP_PORT,
  secure: true,
  auth: {
    user: ENV_VALUES.SMTP_EMAIL,
    pass: ENV_VALUES.SMTP_PASSWORD
  }
});