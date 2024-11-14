import express, { Router } from "express";
import { HomeController } from "../controllers/homeController";
import AboutController from "../controllers/AboutController";
import ContactController from "../controllers/ContactController";
import UserController from "../controllers/UserController";
import auth from "../middlewares/auth";
import ApiController from "../controllers/ApiController";
// const router = express.Router();
const initWebRouter = (app) => {
  app.use(auth.globalVariable);
  app.get("/", HomeController);
  app.get("/about", AboutController);
  app.get("/contact", ContactController);
  app.get("/viewalluser", UserController.getViewAllUserPage);
  app.get(
    "/user/view/:username",
    auth.isMineAuthAdmin,
    UserController.getDetailUserPage
  );
  app.get("/adduser", UserController.getAddUserPage);
  app.get(
    "/edituser/:username",
    auth.isMineAuthAdmin,
    UserController.getEditUserPage
  );
  app.get("/login", UserController.getLoginPage);
  app.get("/logout", UserController.logout);

  app.post("/api/adduser", UserController.addUser);
  app.post(
    "/api/edituser/:username",
    auth.isMineAuthAdmin,
    UserController.editUser
  );
  app.post(
    "/api/deluser/:username",
    auth.isMineAuthAdmin,
    UserController.delUser
  );
  app.post("/api/login", UserController.login);

  // api
  app.get("/api/v1/getlistuser", ApiController.getListUsers);
  app.get(
    "/api/v1/getdetailuserbyusername",
    ApiController.getDetailUserByUsername
  );
  app.get("/api/v1/logout", ApiController.logout);

  app.post("/api/v1/adduser", ApiController.addUser);
  app.post("/api/v1/edituser", ApiController.editUser);
  app.post("/api/v1/deluser", ApiController.delUser);
  app.post("/api/v1/login", ApiController.login);

  // api react
  app.get("/api/getallgroup", ApiController.getAllGroup);

  // return app.use("/api", router);
};

export default initWebRouter;
