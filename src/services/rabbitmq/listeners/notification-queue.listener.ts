import { ENV_VALUES } from "../../../config/env/env.config";
import connect from "../../../config/rabbitmq/rabbitmq.config";

export const notificationListener = async () => {
  try {
    const connection = await connect();
    const channel = await connection.createChannel();

    await channel.assertQueue(ENV_VALUES.RABBITMQ_NOTIFICATION_QUEUE as string, {
      durable: true
    });

    channel.consume(ENV_VALUES.RABBITMQ_NOTIFICATION_QUEUE as string, (msg) => {
      if (msg) {
        
      }
    }, {
      noAck: false
    })
  } catch (error) {
    console.log("🚀 ~ notificationListener ~ error:", error);
  }
}