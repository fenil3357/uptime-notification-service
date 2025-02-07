import * as dotenv from 'dotenv'
dotenv.config();

export const ENV_VALUES = {
  // Server
  PORT: parseInt(process.env.PORT as string),

  // Environment
  NODE_ENV: process.env.NODE_ENV,

  // Smtp
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: parseInt(process.env.SMTP_PORT as string),
  SMTP_EMAIL: process.env.SMTP_EMAIL,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,

  // RabbitMQ
  RABBITMQ_CONNECTION_URL: process.env.RABBITMQ_CONNECTION_URL,
  RABBITMQ_NOTIFICATION_QUEUE: process.env.RABBITMQ_NOTIFICATION_QUEUE
}