import express, { Router } from "express";
import { HomeController } from "../controllers/homeController";
import AboutController from "../controllers/AboutController";
import ContactController from "../controllers/ContactController";
import UserController from "../controllers/UserController";
import auth from "../middlewares/auth";
import apicontroller from "../controllers/ApiController";
const router = express.Router();
const initWebRouter = (app) => {
  app.use(auth.globalVariable);
  router.get("/", HomeController);
  router.get("/about", AboutController);
  router.get("/contact", ContactController);
  router.get("/viewalluser", UserController.getViewAllUserPage);
  router.get(
    "/user/view/:username",
    auth.isMineAuthAdmin,
    UserController.getDetailUserPage
  );
  router.get("/adduser", UserController.getAddUserPage);
  router.get(
    "/edituser/:username",
    auth.isMineAuthAdmin,
    UserController.getEditUserPage
  );
  router.get("/login", UserController.getLoginPage);
  router.get("/logout", UserController.logout);

  router.post("/api/adduser", UserController.addUser);
  router.post(
    "/api/edituser/:username",
    auth.isMineAuthAdmin,
    UserController.editUser
  );
  router.post(
    "/api/deluser/:username",
    auth.isMineAuthAdmin,
    UserController.delUser
  );
  router.post("/api/login", UserController.login);

  // api
  router.get("/api/v1/getlistuser", apicontroller.getListUsers);
  router.get(
    "/api/v1/getdetailuserbyusername",
    apicontroller.getDetailUserByUsername
  );
  router.get("/api/v1/logout", apicontroller.logout);

  router.post("/api/v1/adduser", apicontroller.addUser);
  router.post("/api/v1/edituser", apicontroller.editUser);
  router.post("/api/v1/deluser", apicontroller.delUser);
  router.post("/api/v1/login", apicontroller.login);
  return app.use("/", router);
};
export default initWebRouter;
