import express, { Express, Request, Response, Application } from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import { userRouter } from "./routes/userRoute";
import { coffeeShopRouter } from "./routes/coffeeShopRoute";

//For env File
config();

const app: Application = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method + " " + req.path);
  next();
})

app.use('/api', userRouter);
app.use('/api', coffeeShopRouter);

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
