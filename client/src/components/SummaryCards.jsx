export default function SummaryCards({ summary }) {
    return (
        <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white p-4 rounded shadow">
                <h3 className="text-gray-500">Total Expense</h3>
                <p className="text-2xl font-bold text-red-600">{summary.totalExpense || 0}</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
                <h3 className="text-gray-500">Total Income</h3>
                <p className="text-2xl font-bold text-green-600">{summary.totalIncome || 0}</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
                <h3 className="text-gray-500">Left Balance</h3>
                <p className="text-2xl font-bold text-blue-600">{summary.balance || 0}</p>
            </div>
        </div>
    );
}
