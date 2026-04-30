import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Team Task Manager</h1>

      {/* Subtitle */}
      <p className="mb-6 text-lg text-center max-w-md">
        Manage your team tasks efficiently and track progress in real-time.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-white text-blue-600 px-5 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
        >
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Home;
