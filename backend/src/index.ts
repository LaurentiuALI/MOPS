import express, { Express, Request, Response, Application } from "express";
import { config } from "dotenv";

//For env File
config();

const app: Application = express();
const port = 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
