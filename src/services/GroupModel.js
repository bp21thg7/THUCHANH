import pool from "../configs/db";
const getAllGroup = async () => {
  const [rows, fields] = await pool.execute("SELECT * FROM `nhom`");
  return rows;
};
export default { getAllGroup };
