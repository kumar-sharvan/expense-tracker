import { useState } from "react";
import API from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await API.post("/register", { name, email, password });
            alert("Registered! Please Login.");
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
            <form
                className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6"
                onSubmit={registerUser}
            >
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Create Account</h2>
                {error && <div className="text-red-600 text-center mb-2">{error}</div>}

                <input
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white p-3 rounded-lg font-semibold shadow hover:from-green-600 hover:to-blue-600 transition disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <p className="text-center text-sm mt-2 text-gray-600">
                    Already have an account?{" "}
                    <span
                        className="text-blue-600 font-semibold cursor-pointer hover:underline"
                        onClick={() => navigate("/")}
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
}