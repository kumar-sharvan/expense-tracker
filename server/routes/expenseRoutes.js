// backend/routes/expenseRoutes.js
import express from "express";
import db from "../config/db.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

// Auth middleware
const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: "Missing token" });
    const token = header.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Missing token" });

    const payload = jwt.verify(token, JWT_SECRET);
    // Expect payload to have { id: <userId>, ... }
    if (!payload || !payload.id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }
    req.user = payload;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Create expense
router.post("/expenses", auth, async (req, res) => {
  try {
    let { amount, category, type, description, expense_date } = req.body;

    if (
      amount === undefined ||
      amount === null ||
      category === undefined ||
      type === undefined
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Coerce amount to number
    amount = parseFloat(amount);
    if (Number.isNaN(amount)) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const dateToUse =
      expense_date && expense_date !== ""
        ? expense_date
        : new Date().toISOString().slice(0, 10);

    const [result] = await db.query(
      `INSERT INTO expenses (user_id, amount, category, type, description, expense_date, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [req.user.id, amount, category, type, description || null, dateToUse]
    );

    const insertedId = result.insertId;
    const [rows] = await db.query("SELECT * FROM expenses WHERE id = ?", [
      insertedId,
    ]);

    return res.json({ success: true, expense: rows[0] });
  } catch (err) {
    console.error("Create expense error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Update expense
router.put("/expenses/:id", auth, async (req, res) => {
  try {
    const expenseId = req.params.id;
    let { amount, category, type, description, expense_date } = req.body;

    if (amount !== undefined) amount = parseFloat(amount);
    if (amount !== undefined && Number.isNaN(amount)) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const dateToUse = expense_date && expense_date !== "" ? expense_date : null;

    await db.query(
      `UPDATE expenses
       SET amount = COALESCE(?, amount),
           category = COALESCE(?, category),
           type = COALESCE(?, type),
           description = COALESCE(?, description),
           expense_date = COALESCE(?, expense_date),
           updated_at = NOW()
       WHERE id = ? AND user_id = ?`,
      [amount, category, type, description, dateToUse, expenseId, req.user.id]
    );

    const [rows] = await db.query("SELECT * FROM expenses WHERE id = ?", [
      expenseId,
    ]);
    return res.json({ success: true, expense: rows[0] });
  } catch (err) {
    console.error("Update expense error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Delete expense
router.delete("/expenses/:id", auth, async (req, res) => {
  try {
    const expenseId = req.params.id;
    const [result] = await db.query(
      "DELETE FROM expenses WHERE id = ? AND user_id = ?",
      [expenseId, req.user.id]
    );
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }
    return res.json({ success: true });
  } catch (err) {
    console.error("Delete expense error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Get expenses with filters
router.get("/expenses", auth, async (req, res) => {
  try {
    const { frequency = "ALL", type = "ALL", from, to } = req.query;

    const where = ["user_id = ?"];
    const params = [req.user.id];

    const today = new Date();

    if (frequency === "last_week") {
      const d = new Date();
      d.setDate(today.getDate() - 7);
      where.push("expense_date >= ?");
      params.push(d.toISOString().slice(0, 10));
    } else if (frequency === "last_month") {
      const d = new Date();
      d.setMonth(today.getMonth() - 1);
      where.push("expense_date >= ?");
      params.push(d.toISOString().slice(0, 10));
    } else if (frequency === "last_year") {
      const d = new Date();
      d.setFullYear(today.getFullYear() - 1);
      where.push("expense_date >= ?");
      params.push(d.toISOString().slice(0, 10));
    } else if (frequency === "custom" && from && to) {
      where.push("expense_date BETWEEN ? AND ?");
      params.push(from, to);
    }

    if (type && type !== "ALL") {
      where.push("type = ?");
      params.push(type);
    }

    const whereSQL = where.length ? "WHERE " + where.join(" AND ") : "";
    const [rows] = await db.query(
      `SELECT * FROM expenses ${whereSQL} ORDER BY expense_date DESC, id DESC`,
      params
    );

    return res.json({ expenses: rows });
  } catch (err) {
    console.error("Get expenses error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Summary
router.get("/summary", auth, async (req, res) => {
  try {
    const { from, to } = req.query;
    let where = "WHERE user_id = ?";
    const params = [req.user.id];

    if (from && to) {
      where += " AND expense_date BETWEEN ? AND ?";
      params.push(from, to);
    }

    const [rows] = await db.query(
      `SELECT
         SUM(CASE WHEN type='EXPENSE' THEN amount ELSE 0 END) AS total_expense,
         SUM(CASE WHEN type='CREDIT' THEN amount ELSE 0 END) AS total_income
       FROM expenses
       ${where}`,
      params
    );

    const totals = rows[0] || { total_expense: 0, total_income: 0 };
    const totalExpense = parseFloat(totals.total_expense || 0);
    const totalIncome = parseFloat(totals.total_income || 0);
    const balance = totalIncome - totalExpense;
    return res.json({
      totalExpense,
      totalIncome,
      balance,
    });
  } catch (err) {
    console.error("Summary error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
