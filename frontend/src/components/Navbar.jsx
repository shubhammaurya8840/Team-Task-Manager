import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear(); // 🔥 full clear
    navigate("/login");
  };

  return (
    <div className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow">
      {/* Left Links */}
      <div className="flex gap-6 font-medium">
        <Link to="/dashboard" className="hover:text-gray-300">
          Dashboard
        </Link>
        <Link to="/tasks" className="hover:text-gray-300">
          Tasks
        </Link>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* User */}
        <p className="text-sm text-gray-300">👤 {user?.name || "User"}</p>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
