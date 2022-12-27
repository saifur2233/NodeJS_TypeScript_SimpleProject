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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "Hello World!" });
});

// Error handling
app.use("/*", (req, res, next) => {
  const error = new Error("Not Found");
  console.log(error);

  return res.status(404).json({ message: error.message });
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
