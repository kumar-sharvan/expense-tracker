import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserDashboard = () => {
    const navigate = useNavigate()
    const [expenses, setExpenses] = useState([
        { id: 1, category: 'Food', amount: 50, date: '2025-11-20', description: 'Lunch' },
        { id: 2, category: 'Transport', amount: 20, date: '2025-11-19', description: 'Uber ride' },
        { id: 3, category: 'Entertainment', amount: 30, date: '2025-11-18', description: 'Movie tickets' },
    ])

    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        category: '',
        amount: '',
        date: '',
        description: ''
    })

    const user = JSON.parse(localStorage.getItem('user')) || { name: 'User' }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login')
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleAddExpense = (e) => {
        e.preventDefault()
        if (formData.category && formData.amount && formData.date) {
            const newExpense = {
                id: expenses.length + 1,
                ...formData,
                amount: parseFloat(formData.amount)
            }
            setExpenses([newExpense, ...expenses])
            setFormData({ category: '', amount: '', date: '', description: '' })
            setShowForm(false)
        }
    }

    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
    const categories = [...new Set(expenses.map(exp => exp.category))]

    const getCategoryColor = (category) => {
        const colors = {
            'Food': 'bg-red-100 text-red-700',
            'Transport': 'bg-blue-100 text-blue-700',
            'Entertainment': 'bg-purple-100 text-purple-700',
            'Shopping': 'bg-pink-100 text-pink-700',
            'Bills': 'bg-yellow-100 text-yellow-700',
            'Health': 'bg-green-100 text-green-700'
        }
        return colors[category] || 'bg-gray-100 text-gray-700'
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-indigo-600">💰 Expense Tracker</h1>
                        <p className="text-sm text-gray-600">Welcome, {user.name}!</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Total Expenses</p>
                                <p className="text-3xl font-bold text-indigo-600 mt-2">${totalExpenses.toFixed(2)}</p>
                            </div>
                            <div className="text-4xl">📊</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Total Transactions</p>
                                <p className="text-3xl font-bold text-blue-600 mt-2">{expenses.length}</p>
                            </div>
                            <div className="text-4xl">📝</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">This Month</p>
                                <p className="text-3xl font-bold text-green-600 mt-2">${totalExpenses.toFixed(2)}</p>
                            </div>
                            <div className="text-4xl">📈</div>
                        </div>
                    </div>
                </div>

                {/* Add Expense Button */}
                <div className="mb-8">
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                    >
                        {showForm ? '✕ Cancel' : '+ Add Expense'}
                    </button>
                </div>

                {/* Add Expense Form */}
                {showForm && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Expense</h2>
                        <form onSubmit={handleAddExpense} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="Food">Food</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Shopping">Shopping</option>
                                    <option value="Bills">Bills</option>
                                    <option value="Health">Health</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    step="0.01"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Optional"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div className="md:col-span-4">
                                <button
                                    type="submit"
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-200"
                                >
                                    Add Expense
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Expenses Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800">Recent Expenses</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {expenses.map((expense) => (
                                    <tr key={expense.id} className="hover:bg-gray-50 transition duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(expense.category)}`}>
                                                {expense.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-800">{expense.description || '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-800">{expense.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-lg font-bold text-indigo-600">${expense.amount.toFixed(2)}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {expenses.length === 0 && (
                        <div className="px-6 py-8 text-center">
                            <p className="text-gray-500 text-lg">No expenses yet. Add your first expense to get started!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserDashboard