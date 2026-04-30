const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

//  Create Task
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can create tasks" });
    }

    const { title, assignedTo, project, dueDate } = req.body;

    const task = await Task.create({
      title,
      assignedTo,
      project,
      dueDate, // 🔥 FIX ADDED
      createdBy: req.user.id,
    });

    //  return populated data
    const populatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name")
      .populate("project", "name");

    res.json(populatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//  Get Tasks
router.get("/", auth, async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      // 🔥 admin = all tasks
      tasks = await Task.find()
        .populate("assignedTo", "name")
        .populate("project", "name");
    } else {
      // 👤 member = only assigned
      tasks = await Task.find({
        assignedTo: req.user.id,
      })
        .populate("assignedTo", "name")
        .populate("project", "name");
    }

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//  Update Status
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true },
    )
      .populate("assignedTo", "name")
      .populate("project", "name");

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//  Delete Task
router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can delete" });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
