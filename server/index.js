import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", expenseRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`server running on ${process.env.PORT}`);
});
