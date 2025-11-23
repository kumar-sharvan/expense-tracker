export default function Filters({ filters, setFilters }) {
    return (
        <div className="bg-white p-4 rounded shadow mb-4 flex flex-wrap gap-4">
            <select
                className="p-2 border rounded"
                value={filters.frequency}
                onChange={(e) =>
                    setFilters({ ...filters, frequency: e.target.value })
                }
            >
                <option value="ALL">All</option>
                <option value="last_week">Last Week</option>
                <option value="last_month">Last Month</option>
                <option value="last_year">Last Year</option>
                <option value="custom">Custom</option>
            </select>

            {filters.frequency === "custom" && (
                <>
                    <input
                        type="date"
                        className="p-2 border rounded"
                        onChange={(e) => setFilters({ ...filters, from: e.target.value })}
                    />
                    <input
                        type="date"
                        className="p-2 border rounded"
                        onChange={(e) => setFilters({ ...filters, to: e.target.value })}
                    />
                </>
            )}

            <select
                className="p-2 border rounded"
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
                <option value="ALL">All</option>
                <option value="EXPENSE">Expense</option>
                <option value="CREDIT">Income</option>
            </select>
        </div>
    );
}
