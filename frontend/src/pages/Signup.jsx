import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Signup = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!data.name || !data.email || !data.password) {
      return alert("Please fill all fields");
    }

    if (data.password.length < 5) {
      return alert("Password must be at least 5 characters");
    }

    try {
      setLoading(true);

      await API.post("/auth/signup", data);

      alert("Signup successful 🎉");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-80"
      >
        <h2 className="text-2xl font-bold mb-5 text-center text-gray-700">
          Create Account
        </h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Enter Name"
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        {/* Role */}
        <select
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setData({ ...data, role: e.target.value })}
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>

        {/* Button */}
        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Creating..." : "Signup"}
        </button>

        {/* Login link */}
        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
