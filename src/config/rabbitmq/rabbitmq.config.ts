import amqplib from 'amqplib'

import { ENV_VALUES } from '../env/env.config';

const connect = async (): Promise<amqplib.Connection> => {
  try {
    const connection = await amqplib.connect(ENV_VALUES.RABBITMQ_CONNECTION_URL as string);
    return connection;
  } catch (error: any) {
    console.log("🚀 ~ connect ~ error:", error)
    throw new Error(error?.message || 'Something went wrong while connecting to rabbitMQ!')
  }
}

export default connect;