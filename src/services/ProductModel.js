import pool from "../configs/db";
const getAllProduct = async () => {
  const [rows, fields] = await pool.execute("SELECT * FROM `sanpham`");
  return rows;
};
const getDetailProductById = async (productId) => {
  const [rows, fields] = await pool.execute(
    "SELECT * FROM `sanpham` WHERE `masp` = ?",
    [productId]
  );
  return rows;
};
const addProduct = async (data) => {
  const [rows, fields] = await pool.execute(
    "INSERT INTO `sanpham` (`ten`, `gia`, `hinhanh`, `mota`, `idnhom`) VALUES (?, ?, ?, ?, ?)",
    [data.ten, data.gia, data.hinhanh, data.mota]
  );
  return rows;
};
export default { getAllProduct, getDetailProductById, addProduct };
