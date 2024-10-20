import mysql from "mysql2";
import dotenv from "dotenv/config";
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
const connection = pool.promise();
export default connection;