import express, { Request, Response } from "express";
import cors from 'cors'

import { notificationListener } from "./services/rabbitmq/listeners/notification-queue.listener";
import { ENV_VALUES } from "./config/env/env.config";

const app = express();
const PORT = ENV_VALUES.PORT || 8787;

app.use(cors())
app.use(express.json())

app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to uptime notification service!')
});

app.get('/ping', (_req: Request, res: Response) => {
  res.json({ status: 'Healthy' })
})

app.listen(PORT, async () => {
  try {
    await notificationListener();
    console.log(`Notification service running on port ${PORT}...`)
  } catch (error) {
    console.log("🚀 ~ app.listen ~ error:", error);
  }
});