import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import API from "../api/axiosInstance";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import SummaryCards from "../components/SummaryCards";
import ExpenseTable from "../components/ExpenseTable";
import AddExpenseModal from "../components/AddExpenseModal";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({});
  const [filters, setFilters] = useState({
    frequency: "ALL",
    type: "ALL",
    from: "",
    to: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const fetchExpenses = useCallback(async () => {
    const res = await API.get("/expenses", { params: filters });
    setExpenses(res.data.expenses);
  }, [filters]);

  const fetchSummary = useCallback(async () => {
    const res = await API.get("/summary", { params: filters });
    setSummary(res.data);
  }, [filters]);

  useEffect(() => {
    fetchExpenses();
    fetchSummary();
  }, [fetchExpenses, fetchSummary]);

  const refreshData = useCallback(async () => {
    await Promise.all([fetchExpenses(), fetchSummary()]);
  }, [fetchExpenses, fetchSummary]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <Navbar />
      <Filters filters={filters} setFilters={setFilters} />
      <SummaryCards summary={summary} />
      <AddExpenseModal refresh={refreshData} />
      <ExpenseTable expenses={expenses} refresh={refreshData} />
    </div>
  );
}