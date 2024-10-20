import userModel from "../services/UserModel";
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
  const user = await userModel.getUserByUsername(username);
  res.render("main", {
    data: {
      title: "Thong tin chi tiết",
      page: "viewDetailUser",
      user: user[0],
    },
  });
};
// xử lý form
const addUser = async (req, res) => {
  const data = req.body;
  await userModel.addUser(data);
  res.redirect("/viewalluser");
};
export default {
  getViewAllUserPage,
  getAddUserPage,
  getDetailUserPage,
  addUser,
};
