// src/pages/Dashboard.jsx
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import SummaryCards from "../components/SummaryCards";
import ExpenseTable from "../components/ExpenseTable";
import AddExpenseModal from "../components/AddExpenseModal";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(false);
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
      return;
    }
  }, [navigate]);

  // Helper to remove empty query params
  const cleanParams = (params) => {
    const p = { ...params };
    if (!p.from) delete p.from;
    if (!p.to) delete p.to;
    if (!p.frequency) delete p.frequency;
    if (!p.type) delete p.type;
    return p;
  };

  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get("/expenses", { params: cleanParams(filters) });
      setExpenses(res.data.expenses || []);
    } catch (err) {
      console.error("Fetch expenses error:", err);
      // Optional: handle unauthorized -> redirect to login
      if (err?.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  }, [filters, navigate]);

  const fetchSummary = useCallback(async () => {
    try {
      const res = await API.get("/summary", { params: cleanParams(filters) });
      setSummary(res.data || {});
    } catch (err) {
      console.error("Fetch summary error:", err);
      if (err?.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  }, [filters, navigate]);

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
      {loading ? <div className="text-center my-4 text-2xl">Loading...</div> : <ExpenseTable expenses={expenses} refresh={refreshData} />}
    </div>
  );
}
