import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-indigo-600">💰 Expense Tracker</h1>
                    <Link
                        to="/login"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                    >
                        Login
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div>
                        <h2 className="text-5xl font-bold text-gray-900 mb-4">
                            Track Your <span className="text-indigo-600">Expenses</span> Effortlessly
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Take control of your finances with our easy-to-use expense tracker. Monitor spending, set budgets, and achieve your financial goals.
                        </p>
                        <div className="flex gap-4">
                            <Link
                                to="/login"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
                            >
                                Get Started
                            </Link>
                            <button className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-3 px-8 rounded-lg transition duration-200">
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* Right Image/Illustration */}
                    <div className="bg-gradient-to-br from-indigo-100 to-blue-100 rounded-lg p-12 flex items-center justify-center h-96">
                        <div className="text-center">
                            <div className="text-6xl mb-4">📊</div>
                            <p className="text-gray-700 font-semibold">Financial Overview</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-4xl font-bold text-center text-gray-900 mb-12">
                        Why Choose Us?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <div className="text-5xl mb-4">💵</div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Easy Tracking</h4>
                            <p className="text-gray-600">
                                Quickly log your expenses and categorize them automatically for better insights.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <div className="text-5xl mb-4">📈</div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Detailed Reports</h4>
                            <p className="text-gray-600">
                                Get comprehensive analytics and reports to understand your spending patterns.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <div className="text-5xl mb-4">🔒</div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Secure & Private</h4>
                            <p className="text-gray-600">
                                Your financial data is encrypted and kept completely private and secure.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-indigo-600 to-blue-600 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-4xl font-bold text-white mb-4">
                        Ready to Take Control of Your Finances?
                    </h3>
                    <p className="text-indigo-100 text-lg mb-8">
                        Join thousands of users managing their expenses smarter.
                    </p>
                    <Link
                        to="/login"
                        className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition duration-200 inline-block"
                    >
                        Start Now
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p>&copy; 2025 Expense Tracker. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default Home