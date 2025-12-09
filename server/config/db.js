import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 20000, // ⬅ prevents ETIMEDOUT
  ssl: {
    rejectUnauthorized: false, // ⬅ REQUIRED for many cloud DBs
  },
});

// Test connection safely
(async () => {
  try {
    const conn = await db.getConnection();
    console.log("✅ Database connected successfully!");
    conn.release();
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
})();

export default db;
