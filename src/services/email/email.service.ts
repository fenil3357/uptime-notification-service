import Mail from "nodemailer/lib/mailer";

import { transporter } from "../../config/email/smtp/nodemailer.config";

export const sendEmailService = async (options: Mail.Options) => {
  try {
    await transporter.sendMail(options);
  } catch (error: any) {
    console.log("🚀 ~ sendEmailService ~ error:", error)
    throw new Error(error?.message || 'Something went wrong while sending email.')
  }
}