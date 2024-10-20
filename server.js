import express from "express";
import dotenv from "dotenv/config";
import bodyParser from "body-parser";
import date from "./date";
import { getPagramsURL, getPath } from "./getURL";
import viewEngine from "./viewEngine";
import initWebRouter from "./src/route/web";
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
viewEngine(app);
initWebRouter(app);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
