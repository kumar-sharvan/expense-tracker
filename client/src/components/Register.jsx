import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../service/api";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await API.post("/register", { name, email, password });

            if (res.data.success) {
                console.log(res);
                alert(res.data.message);
                navigate("/login");
                setName("");
                setEmail("");
                setPassword("");
            } else {
                setError(res.data.message || "Registration failed");
            }
        } catch (error) {
            console.error("Error:", error);
            setError(error.response?.data?.message || "Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Create an Account
                </h2>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                        {error}
                    </div>
                )}

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@email.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-all duration-300 focus:ring-4 focus:ring-indigo-300 disabled:bg-indigo-400"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-500 mt-5">
                    Already have an account?{" "}
                    <a href="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;