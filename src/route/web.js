import express, { Router } from "express";
import { HomeController } from "../controllers/homeController";
import AboutController from "../controllers/AboutController";
import ContactController from "../controllers/ContactController";
import UserController from "../controllers/UserController";
const router = express.Router();
const initWebRouter = (app) => {
  router.get("/", HomeController);
  router.get("/about", AboutController);
  router.get("/contact", ContactController);
  router.get("/viewalluser", UserController.getViewAllUserPage);
  router.get("/adduser", UserController.getAddUserPage);
  router.get("/user/view/:username", UserController.getDetailUserPage);
  router.post("/api/adduser", UserController.addUser);
  return app.use("/", router);
};
export default initWebRouter;
