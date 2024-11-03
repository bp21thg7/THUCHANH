import express from "express";
import dotenv from "dotenv/config";
import bodyParser from "body-parser";
import date from "./date";
import { getPagramsURL, getPath } from "./getURL";
import viewEngine from "./viewEngine";
import initWebRouter from "./src/route/web";
import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";
const app = express();
const redisClient = createClient({
  password: "35C07DZlgDH394mS2SPBhOF5yy8yNxWQ",
  socket: {
    host: "redis-14146.c295.ap-southeast-1-1.ec2.redns.redis-cloud.com",
    port: 14146,
  },
});
redisClient.connect().catch(console.error);
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp",
});

app.use(
  session({
    store: redisStore,
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
viewEngine(app);
initWebRouter(app);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
