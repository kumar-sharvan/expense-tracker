import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })
  .promise();

if (!db) {
  console.error("Error connecting to the database");
} else {
  console.log("✅ Database connected successfully");
}

export default db;
