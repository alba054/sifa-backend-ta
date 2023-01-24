import https from "https";
import dotenv from "dotenv";

dotenv.config();

class NotificationService {
  async sendNotification(content: string, subs: any) {
    const ONE_SIGNAL_URI = "https://onesignal.com/api/v1/notifications";

    const body = {
      app_id: process.env.ONE_SIGNAL_APP_ID,
      include_player_ids: subs,
      contents: {
        en: content,
      },
    };
    const req = https.request(
      ONE_SIGNAL_URI,
      {
        headers: {
          Authorization: `Basic ${process.env.ONE_SIGNAL_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
      },
      (res) => {
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          console.log(chunk);
        });
      }
    );

    req.on("error", (err) => {
      console.log(err);
    });

    req.write(JSON.stringify(body));
    req.end();
  }
}

export const notifService = new NotificationService();
