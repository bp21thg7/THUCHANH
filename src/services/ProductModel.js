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
export default { getAllProduct, getDetailProductById };
