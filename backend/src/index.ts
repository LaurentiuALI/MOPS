import express, { Express, Request, Response, Application } from "express";
import mongoose from "mongoose";
import { config } from "dotenv";

//For env File
config();

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to db & listening on port " + process.env.PORT + "..."
      );
    });
  })
  .catch((err) => console.error(err));
