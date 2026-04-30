import { useEffect, useState } from "react";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getUsers,
  getProjects,
} from "../services/api";
import Navbar from "../components/Navbar";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [users, setUsers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");
  const [user, setUser] = useState(null);

  // 🔐 Load user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // 📥 Fetch Data
  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  const fetchProjects = async () => {
    const res = await getProjects();
    setProjects(res.data);
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
    fetchProjects();
  }, []);

  // ➕ Add Task
  const handleAdd = async () => {
    if (!title) return;

    await createTask({
      title,
      assignedTo: assignedTo || null,
      project: projectId || null,
      dueDate: dueDate || null,
    });

    setTitle("");
    setAssignedTo("");
    setProjectId("");
    setDueDate("");

    fetchTasks();
  };

  // ❌ Delete
  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  // 🔄 Status update
  const handleStatus = async (id, status) => {
    await updateTask(id, { status });
    fetchTasks();
  };

  // 🔍 Filter
  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.status === "completed";
    if (filter === "pending") return t.status === "pending";
    return true;
  });

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Task Manager 🚀
        </h2>

        {/* 🔐 ADMIN CREATE */}
        {user?.role === "admin" && (
          <div className="bg-white p-4 rounded-xl shadow mb-6 space-y-3">
            <h3 className="font-semibold">Create Task</h3>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task..."
              className="border p-2 rounded w-full"
            />

            <div className="grid md:grid-cols-3 gap-2">
              {/* Assign */}
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">Assign User</option>
                {users
                  .filter((u) => u.role === "member")
                  .map((u) => (
                    <option key={u._id} value={u._id}>
                      {u.name}
                    </option>
                  ))}
              </select>

              {/* Project */}
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">Select Project</option>
                {projects.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>

              {/* Due */}
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="border p-2 rounded"
              />
            </div>

            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Add Task
            </button>
          </div>
        )}

        {/* 🔥 FILTERS */}
        <div className="flex gap-3 mb-4 justify-center">
          <button
            onClick={() => setFilter("all")}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            All
          </button>

          <button
            onClick={() => setFilter("pending")}
            className="bg-red-200 px-3 py-1 rounded"
          >
            Pending
          </button>

          <button
            onClick={() => setFilter("completed")}
            className="bg-green-200 px-3 py-1 rounded"
          >
            Completed
          </button>
        </div>

        {/* ❌ Empty */}
        {filteredTasks.length === 0 && (
          <p className="text-center text-gray-500">No tasks yet 🚀</p>
        )}

        {/* 🧩 TASK LIST */}
        <div className="space-y-4">
          {filteredTasks.map((t) => {
            const isOverdue =
              t.dueDate &&
              new Date(t.dueDate) < new Date() &&
              t.status !== "completed";

            return (
              <div
                key={t._id}
                className={`bg-white p-4 rounded-xl shadow transition hover:shadow-md ${
                  isOverdue ? "border-l-4 border-red-500" : ""
                }`}
              >
                {/* Title */}
                <h4
                  className={`font-semibold text-lg ${
                    t.status === "completed"
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {t.title}
                </h4>

                {/* Project */}
                <p className="text-xs text-blue-500 mt-1">
                  📁 {t.project?.name || "No Project"}
                </p>

                {/* Assigned */}
                <p className="text-sm text-gray-500">
                  👤 {t.assignedTo?.name || "Self"}
                </p>

                {/* Due */}
                <p
                  className={`text-sm ${
                    isOverdue ? "text-red-500 font-semibold" : "text-gray-400"
                  }`}
                >
                  ⏳{" "}
                  {t.dueDate
                    ? new Date(t.dueDate).toLocaleDateString()
                    : "No due date"}
                </p>

                {/* Status */}
                <div className="flex justify-between items-center mt-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      t.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {t.status}
                  </span>

                  <div className="flex gap-2 items-center">
                    <select
                      value={t.status}
                      onChange={(e) => handleStatus(t._id, e.target.value)}
                      className="border p-1 rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>

                    {user?.role === "admin" && (
                      <button
                        onClick={() => handleDelete(t._id)}
                        className="bg-red-500 text-white px-2 rounded"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Tasks;
