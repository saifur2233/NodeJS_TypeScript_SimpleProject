import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { config } from "./config/config";

const app = express();
const port = process.env.PORT || 5000;

// connect to mongodb
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
