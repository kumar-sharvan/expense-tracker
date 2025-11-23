import API from "../api/axiosInstance";

export default function ExpenseTable({ expenses, refresh }) {
    const deleteExpense = async (id) => {
        await API.delete(`/expenses/${id}`);
        refresh();
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
            <table className="min-w-full text-sm border-separate border-spacing-y-2">
                <thead>
                    <tr className="bg-gradient-to-r from-blue-100 to-purple-100">
                        <th className="p-3 text-left font-semibold text-gray-700 rounded-tl-xl">Date</th>
                        <th className="p-3 text-left font-semibold text-gray-700">Amount</th>
                        <th className="p-3 text-left font-semibold text-gray-700">Category</th>
                        <th className="p-3 text-left font-semibold text-gray-700">Type</th>
                        <th className="p-3 text-left font-semibold text-gray-700">Description</th>
                        <th className="p-3 text-center font-semibold text-gray-700 rounded-tr-xl">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((e) => (
                        <tr
                            key={e.id}
                            className="bg-white hover:bg-blue-50 transition-colors shadow-sm rounded-xl"
                        >
                            <td className="p-3 rounded-l-xl">{e.expense_date}</td>
                            <td className="p-3">{e.amount}</td>
                            <td className="p-3">{e.category}</td>
                            <td className="p-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium
                                    ${e.type === "Income" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                                `}>
                                    {e.type}
                                </span>
                            </td>
                            <td className="p-3">{e.description}</td>
                            <td className="p-3 text-center rounded-r-xl">
                                <button
                                    onClick={() => deleteExpense(e.id)}
                                    className="bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded-full text-xs shadow transition"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}