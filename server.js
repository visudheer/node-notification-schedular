import express from "express";
import { scheduleJob } from "node-schedule";
import * as dotenv from "dotenv";
import axios from "axios";

const app = express();
app.use(express.json());
dotenv.config();

//"0 6 * * *"

//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

const job = scheduleJob("*/10 * * * *", async () => {
  await axios
    .get(process.env.APOD_API + process.env.APOD_API_KEY)
    .then((data) => {
      axios
        .post(process.env.DB_URL + process.env.DB_PATH, {
          title: data.data.title,
          explanation: data.data.explanation,
          date: data.data.date,
          imgUrl: data.data.hdurl,
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

app.listen(5000);
