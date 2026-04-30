const TaskCard = ({ task }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition mb-4">
      {/* Title */}
      <h4 className="font-semibold text-lg text-gray-800">{task.title}</h4>

      {/* Project */}
      <p className="text-xs text-blue-500 mt-1">
        📁 {task.project?.name || "No Project"}
      </p>

      {/* Assigned */}
      <p className="text-sm text-gray-500">
        👤 {task.assignedTo?.name || "Self"}
      </p>

      {/* Due Date */}
      <p className="text-sm text-gray-400">
        ⏳{" "}
        {task.dueDate ? new Date(task.dueDate).toDateString() : "No due date"}
      </p>

      {/* Status */}
      <span
        className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
          task.status === "completed"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-600"
        }`}
      >
        {task.status}
      </span>
    </div>
  );
};

export default TaskCard;
