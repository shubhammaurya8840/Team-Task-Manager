import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-5 hidden md:block">
      <h2 className="text-2xl font-bold mb-6">Task Manager</h2>

      <ul className="space-y-4">
        <li>
          <Link to="/dashboard" className="block hover:text-blue-400">
            📊 Dashboard
          </Link>
        </li>

        <li>
          <Link to="/tasks" className="block hover:text-blue-400">
            ✅ Tasks
          </Link>
        </li>

        <li>
          <Link to="/projects" className="block hover:text-blue-400">
            📁 Projects
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
