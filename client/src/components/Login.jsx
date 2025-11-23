import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../service/api'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const res = await API.post("/login", { email, password })

            if (res.data.success) {
                console.log(res)
                localStorage.setItem("token", res.data.token)
                // localStorage.setItem("user", JSON.stringify(res.data.user))
                alert(res.data.message)
                setEmail("")
                setPassword("")
                navigate("/dashboard")
            } else {
                setError(res.data.message || "Login failed")
                setLoading(false)
            }
        } catch (error) {
            console.error("Full Error:", error)
            const errorMsg = error.response?.data?.message || error.message || "Network error. Please try again."
            setError(errorMsg)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Welcome Back</h1>
                <p className="text-gray-600 text-center mb-8">Sign in to your account</p>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="you@example.com"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="••••••••"
                            required
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition duration-200"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-6">
                    Don't have an account? <Link to="/signup" className="text-indigo-600 hover:text-indigo-700 font-medium">Sign up</Link>
                </p>
            </div>
        </div>
    )
}

export default Login