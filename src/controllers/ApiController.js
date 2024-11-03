import { compareSync } from "bcrypt";
import userModel from "../services/UserModel";
const getListUsers = async (req, res) => {
  const users = await userModel.getAllUser();
  return res.status(200).json({
    status: "Success",
    users: users,
  });
};
const getDetailUserByUsername = async (req, res) => {
  const { username } = req.params;
  const users = await userModel.getDetailByUsername(username);
  if (users.length == 0) {
    return res.status(404).json({
      status: "Fail",
      user: null,
    });
  }
  return res.status(200).json({
    status: "Success",
    user: users[0],
  });
};
const addUser = async (req, res) => {
  const data = req.body;
  const users = await userModel.getDetailByUsername(data.username);
  if (users.length > 0) {
    return res.status(403).json({
      status: "Fail",
      message: "Tài khoản đã tồn tại!",
    });
  }
  await userModel.addUser(data);
  req.session.isLogin = true;
  req.session.username = data.username;
  req.session.fullname = data.fullname;
  req.session.role = 1;
  return res.status(200).json({
    status: "Success",
    message: "Đăng kí tài khoản thành công!",
  });
};
const editUser = async (req, res) => {
  const data = req.body;
  await userModel.editUser(data);
  return res.status(200).json({
    status: "Success",
  });
};
const delUser = async (req, res) => {
  const data = req.body;
  await userModel.delUser(data);
  if (req.session.username == req.session.username) {
    req.session.destroy();
  }
  return res.status(200).json({
    status: "Success",
  });
};
const login = async (req, res) => {
  const data = req.body;
  const users = await userModel.getDetailByUsername(data.username);
  if (users.length == 0) {
    return res.status(403).json({
      status: "Fail",
      message: "Sai thông tin đăng nhập!",
    });
  }
  const user = users[0];
  const isChecked = compareSync(data.password, user.password);
  if (isChecked) {
    req.session.isLogin = true;
    req.session.username = user.username;
    req.session.fullname = user.fullname;
    req.session.role = user.role;
    return res.status(200).json({
      status: "Success",
      message: "Đăng nhập thành công!",
    });
  }
  return res.status(403).json({
    status: "Fail",
    message: "Đăng nhập thất bại",
  });
};
const logout = async (req, res) => {
  req.session.destroy();
  return res.status(200).json({
    status: "Success",
  });
};
export default {
  getListUsers,
  getDetailUserByUsername,
  addUser,
  editUser,
  delUser,
  login,
  logout,
};
