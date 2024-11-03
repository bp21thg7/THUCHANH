import { render } from "ejs";
import userModel from "../services/UserModel";
import { compareSync } from "bcrypt";
const getViewAllUserPage = async (req, res) => {
  const users = await userModel.getAllUser();

  return res.render("main", {
    data: {
      title: "Danh sách người dùng",
      page: "viewAllUser",
      rows: users,
    },
  });
};
const getAddUserPage = (req, res) => {
  return res.render("main", {
    data: {
      title: "Thêm người dùng mới",
      page: "addUser",
    },
  });
};
const getDetailUserPage = async (req, res) => {
  const { username } = req.params;
  const user = await userModel.getDetailByUsername(username);
  res.render("main", {
    data: {
      title: "Thông tin chi tiết",
      page: "viewDetailUser",
      user: user[0],
    },
  });
};
const getEditUserPage = async (req, res) => {
  const { username } = req.params;
  const user = await userModel.getDetailByUsername(username);
  res.render("main", {
    data: {
      title: "Chỉnh sửa thông tin",
      page: "editUser",
      user: user[0],
    },
  });
};
const getLoginPage = async (req, res) => {
  return res.render("main", {
    data: {
      title: "Đăng nhập",
      page: "login",
    },
  });
};
// xử lý form
const addUser = async (req, res) => {
  const data = req.body;
  const users = await userModel.getDetailByUsername(data.username);
  if (users.length > 0) {
    res.locals.messageError = "Tài khoản đã tồn tại";
    return res.render("main", {
      data: {
        title: "Thêm người dùng mới",
        page: "addUser",
        user: data,
      },
    });
  }
  await userModel.addUser(data);
  req.session.isLogin = true;
  req.session.username = data.username;
  req.session.fullname = data.fullname;
  req.session.role = 1;
  res.redirect("/viewalluser");
};
const editUser = async (req, res) => {
  const data = req.body;
  await userModel.editUser(data);
  res.redirect("/viewalluser");
};
const delUser = async (req, res) => {
  const data = req.body;
  await userModel.delUser(data);
  if (req.session.username == req.params.username) {
    req.session.destroy();
  }
  res.redirect("/viewalluser");
};
const login = async (req, res) => {
  const data = req.body;
  const users = await userModel.getDetailByUsername(data.username);
  if (users.length == 0) {
    return res.redirect("/login");
  }
  const user = users[0];
  const isChecked = compareSync(data.password, user.password);
  if (isChecked) {
    req.session.isLogin = true;
    req.session.username = user.username;
    req.session.fullname = user.fullname;
    req.session.role = user.role;
    return res.redirect("/");
  }
  return res.redirect("/login");
};
const logout = async (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};
export default {
  getViewAllUserPage,
  getAddUserPage,
  getEditUserPage,
  getDetailUserPage,
  getLoginPage,
  addUser,
  editUser,
  delUser,
  login,
  logout,
};
