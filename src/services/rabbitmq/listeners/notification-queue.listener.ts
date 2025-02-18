import generateMonitorDownEmailTemplate from "../../../config/email/templates/monitor-down-report.template";
import { ENV_VALUES } from "../../../config/env/env.config";
import connect from "../../../config/rabbitmq/rabbitmq.config";
import { isValidJson } from "../../../utils/isJson";
import { sendEmailService } from "../../email/email.service";

export const notificationListener = async () => {
  try {
    const connection = await connect();
    const channel = await connection.createChannel();

    await channel.assertQueue(ENV_VALUES.RABBITMQ_NOTIFICATION_QUEUE as string, {
      durable: true
    });

    await channel.consume(ENV_VALUES.RABBITMQ_NOTIFICATION_QUEUE as string, async (msg) => {
      try {
        if (msg) {
          const msgContent = msg.content.toString();

          if (!isValidJson(msgContent)) {
            channel.ack(msg);
            return;
          }

          const data: {
            type: "ERROR" | "SUCCESS",
            content: {
              endpoint: string,
              monitorName: string,
              monitorPageUrl: string,
              type: "WEBSITE" | "API",
              userName: string,
              userEmail: string,
              errorReport?: {
                time: string,
                errorMessage: string,
                errorJson: object
              },
              errorAnalysis?: string
            }
          } = JSON.parse(msgContent);

          await sendEmailService({
            to: data?.content?.userEmail,
            html: generateMonitorDownEmailTemplate(data?.content?.userName, data?.content?.monitorName, data?.content?.type, data?.content?.endpoint, data?.content?.monitorPageUrl, data?.content?.errorReport, data?.content?.errorAnalysis),
            from: 'UPTIME no-reply@uptime-pro.onrender.com',
            subject: `Your ${data?.content?.type} ${data?.content?.monitorName} is Down!`
          })
        }
      } catch (error) {
        console.log("🚀 ~ await channel.consume ~ error:", error)
      }
      finally {
        if (msg) channel.ack(msg);
      }
    }, {
      noAck: false
    })
  } catch (error) {
    console.log("🚀 ~ notificationListener ~ error:", error);
  }
}