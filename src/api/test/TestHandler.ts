import { Request, Response, NextFunction } from "express";
import amqlib from "amqplib";

export class TestHandler {
  async postMessage(req: Request, res: Response, next: NextFunction) {
    // const { message, severity } = req.body;

    try {
      const connection = await amqlib.connect("amqp://localhost");

      const channel = await connection.createChannel();

      // channel.assertExchange("hello", "direct", {
      //   durable: false,
      // });

      // channel.publish("hello", severity, Buffer.from(message));

      channel.assertQueue("rpc_server", { durable: false });
      channel.prefetch(1);

      channel.consume("rpc_server", (msg: amqlib.ConsumeMessage | null) => {
        if (msg) {
          const result = parseInt(msg?.content.toString());
          channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(result.toString()),
            { correlationId: msg.properties.correlationId }
          );
        }
      });

      // setTimeout(() => {
      //   connection.close();
      // }, 500);

      return res.json("success");
    } catch (error) {
      return next(error);
    }
  }
}
