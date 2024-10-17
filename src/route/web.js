import express from "express";
const router = express.Router();
import { HomeController } from "../controllers/homeController";
const initWebRouter = (app) => {
  router.get("/", (req, res) => {
    HomeController(req, res);
  });
  return app.use("/", router);
};
export default initWebRouter;
