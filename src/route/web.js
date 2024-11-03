import express, { Router } from "express";
import { HomeController } from "../controllers/homeController";
import AboutController from "../controllers/AboutController";
import ContactController from "../controllers/ContactController";
import UserController from "../controllers/UserController";
import auth from "../middlewares/auth";
const router = express.Router();
const initWebRouter = (app) => {
  app.use(auth.globalVariable);
  router.get("/", HomeController);
  router.get("/about", AboutController);
  router.get("/contact", ContactController);
  router.get("/login", UserController.getLoginPage);
  router.get("/logout", UserController.logout);

  router.post("/api/login", UserController.login);
  // admin
  router.post("/api/deluser", UserController.delUser);

  // user
  router.get("/user/view/:username", UserController.getDetailUserPage);
  router.get("/edituser/:username", UserController.getEditUserPage);

  // no login
  router.get("/viewalluser", UserController.getViewAllUserPage);
  router.get("/adduser", UserController.getAddUserPage);
  router.post("/api/adduser", UserController.addUser);
  router.post("/api/edituser", UserController.editUser);

  return app.use("/", router);
};
export default initWebRouter;
