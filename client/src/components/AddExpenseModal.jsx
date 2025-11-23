import { useState, useEffect } from "react";
import API from "../api/axiosInstance";
// ...existing code...
export default function AddExpenseModal({ refresh }) {
    const [open, setOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        amount: "",
        category: "",
        type: "EXPENSE",
        description: "",
        expense_date: new Date().toISOString().split("T")[0],
    });

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const saveExpense = async () => {
        try {
            setSaving(true);
            await API.post("/expenses", form);
            setOpen(false);
            refresh();
            setForm((f) => ({ ...f, amount: "", category: "", description: "" }));
        } catch (err) {
            // handle error as needed
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full mb-4 shadow"
            >
                + Add New
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-50 bg-black bg-opacity-45 flex items-center justify-center p-4"
                    onClick={() => setOpen(false)}
                >
                    <div
                        className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 space-y-4 transform transition-all"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="add-expense-title"
                    >
                        {/* Cross button top-right */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            aria-label="Close"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h2 id="add-expense-title" className="text-lg font-semibold text-gray-800">Add Expense</h2>

                        <div className="grid grid-cols-1 gap-3">
                            <input
                                className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                                placeholder="Amount"
                                value={form.amount}
                                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                                inputMode="decimal"
                            />

                            <select
                                className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                            >
                                <option value="">Select Category</option>
                                <option>GROCERIES</option>
                                <option>FOOD</option>
                                <option>RENT</option>
                                <option>SALARY</option>
                                <option>ELECTRICITY_BILL</option>
                                <option>ENTERTAINMENT</option>
                                <option>TRANSPORTATION</option>
                                <option>FRUITS</option>
                                <option>UTILITIES</option>
                                <option>MEDICAL</option>
                                <option>GAS_CHARGE</option>
                                <option>OTHER</option>
                            </select>

                            <select
                                className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                                value={form.type}
                                onChange={(e) => setForm({ ...form, type: e.target.value })}
                            >
                                <option value="EXPENSE">Expense</option>
                                <option value="CREDIT">Credit</option>
                            </select>

                            <input
                                type="date"
                                className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                                value={form.expense_date}
                                onChange={(e) => setForm({ ...form, expense_date: e.target.value })}
                            />

                            <textarea
                                className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                                placeholder="Description"
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                rows={3}
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                onClick={saveExpense}
                                disabled={saving}
                                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow disabled:opacity-60"
                            >
                                {saving ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
// ...existing code...