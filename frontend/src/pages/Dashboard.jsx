import { useEffect, useState } from "react";
import {
  getTasks,
  getUsers,
  createProject,
  getProjects,
  deleteProject,
} from "../services/api";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchData = async () => {
    try {
      setLoading(true);

      const taskRes = await getTasks();
      const userRes = await getUsers();
      const projectRes = await getProjects();

      setTasks(taskRes.data);
      setUsers(userRes.data);
      setProjects(projectRes.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = tasks.filter((t) => t.status === "pending").length;

  const overdue = tasks.filter(
    (t) =>
      t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "completed",
  ).length;

  const filteredTasks = selectedProject
    ? tasks.filter((t) => t.project?._id === selectedProject)
    : tasks;

  const handleProject = async () => {
    if (!projectName) return;

    await createProject({ name: projectName });
    setProjectName("");
    fetchData();
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Delete project & all tasks?")) return;

    try {
      await deleteProject(id);

      setProjects((prev) => prev.filter((p) => p._id !== id));

      if (selectedProject === id) {
        setSelectedProject(null);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Delete failed ❌");
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Dashboard 📊
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded shadow text-center">
            <h3>Total</h3>
            <p className="text-2xl text-blue-600 font-bold">{total}</p>
          </div>

          <div className="bg-green-100 p-5 rounded shadow text-center">
            <h3>Completed</h3>
            <p className="text-2xl text-green-700 font-bold">{completed}</p>
          </div>

          <div className="bg-red-100 p-5 rounded shadow text-center">
            <h3>Pending</h3>
            <p className="text-2xl text-red-700 font-bold">{pending}</p>
          </div>

          <div className="bg-yellow-100 p-5 rounded shadow text-center">
            <h3 className="text-gray-600">Overdue ⏰</h3>
            <p className="text-3xl font-bold text-yellow-700">{overdue}</p>
          </div>
        </div>

        {user?.role === "admin" && (
          <div className="mt-8 bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Create Project</h3>

            <div className="flex gap-2">
              <input
                placeholder="Project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="border p-2 flex-1 rounded"
              />
              <button
                onClick={handleProject}
                className="bg-green-600 text-white px-4 rounded"
              >
                Add
              </button>
            </div>
          </div>
        )}

        {user?.role === "admin" && (
          <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold mb-3">Projects</h3>

            <div className="flex gap-2 flex-wrap justify-center">
              <button
                onClick={() => setSelectedProject(null)}
                className={`px-3 py-1 rounded ${
                  !selectedProject ? "bg-gray-800 text-white" : "bg-gray-200"
                }`}
              >
                All
              </button>

              {projects.map((p) => (
                <div
                  key={p._id}
                  className="bg-blue-100 px-3 py-1 rounded flex items-center gap-2"
                >
                  <button
                    onClick={() => setSelectedProject(p._id)}
                    className={`text-sm ${
                      selectedProject === p._id ? "font-bold text-blue-700" : ""
                    }`}
                  >
                    {p.name}
                  </button>

                  <span
                    onClick={() => handleDeleteProject(p._id)}
                    className="cursor-pointer text-red-500 ml-2"
                  >
                    ❌
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-center">Tasks</h3>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : filteredTasks.length === 0 ? (
            <p className="text-center text-gray-400">No tasks yet 🚀</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {filteredTasks.map((t) => (
                <div
                  key={t._id}
                  className="bg-white p-4 rounded shadow hover:shadow-md transition"
                >
                  <h4 className="font-semibold">{t.title}</h4>

                  <p className="text-xs text-blue-500">
                    📁 {t.project?.name || "No Project"}
                  </p>

                  <p className="text-sm text-gray-500">
                    👤 {t.assignedTo?.name || "Self"}
                  </p>

                  <p
                    className={`text-sm ${
                      t.dueDate &&
                      new Date(t.dueDate) < new Date() &&
                      t.status !== "completed"
                        ? "text-yellow-600 font-semibold"
                        : "text-gray-400"
                    }`}
                  >
                    ⏳{" "}
                    {t.dueDate
                      ? new Date(t.dueDate).toDateString()
                      : "No due date"}
                  </p>

                  <span
                    className={`inline-block mt-2 px-2 py-1 rounded text-xs ${
                      t.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
