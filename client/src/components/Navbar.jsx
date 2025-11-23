import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState({ name: "Guest" });
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchUserName = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("Logged in user:", user);
      return user || { name: "Guest" };
    };

    const user = fetchUserName();
    setUser(user);
  }, []);

  return (
    <div className="flex justify-between items-center bg-white p-4 shadow rounded mb-4">
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
