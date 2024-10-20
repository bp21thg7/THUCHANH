import pool from "../configs/db";
import { hashSync } from "bcrypt";
const getAllUser = async () => {
  const [rows, fields] = await pool.execute("SELECT * FROM `users`");
  return rows;
};
const getDetailByUsername = async (username) => {
  const [rows, fields] = await pool.execute(
    "SELECT * FROM `users` WHERE `username` = ?",
    [username]
  );
  return rows;
};
const addUser = async (data) => {
  const hashedPassword = hashSync(data.password, 10);
  const [rows, fields] = await pool.execute(
    "INSERT INTO `users`(`username`, `password`, `fullname`, `address` ,`sex`, `email`) VALUES (?, ?, ?, ?, ?, ?)",
    [
      data.username,
      hashedPassword,
      data.fullname,
      data.address,
      data.sex,
      data.email,
    ]
  );
  return rows;
};
const editUser = async (data) => {
  const [rows, fields] = await pool.execute(
    "UPDATE `users` SET `username` = ?, `fullname` = ?, `address` = ?, `sex` = ?, `email` = ? WHERE `username` = ?",
    [
      data.username,
      data.fullname,
      data.address,
      data.sex,
      data.email,
      data.usernameEdit,
    ]
  );
};
export default { getAllUser, getDetailByUsername, addUser, editUser };
