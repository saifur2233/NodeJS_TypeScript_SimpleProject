import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cors from "cors";
import { config } from "./config/config";
import authorRoutes from "./routes/authorRoute";

const app = express();
const port = process.env.PORT || 5000;

// connect to mongodb
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    console.log("Connected");
    StartServer();
  })
  .catch((error) => {
    console.log(error);
  });

/** Only Start Server if Mongoose Connects */
const StartServer = () => {
  /** Log the request */
  app.use((req, res, next) => {
    /** Log the req */
    console.log(
      `Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      /** Log the res */
      console.log(
        `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
      );
    });

    next();
  });

  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  //route check
  app.get("/", (req, res, next) => {
    res.status(200).json({ message: "Hello World!" });
  });

  //Routes
  app.use("/api/v1", authorRoutes);

  // Error handling
  app.use("*", (req, res, next) => {
    const error = new Error("Not Found");
    console.log(error);

    return res.status(404).json({ message: error.message });
  });

  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
};
