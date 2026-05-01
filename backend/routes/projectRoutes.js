const express = require("express");
const router = express.Router();

const Project = require("../models/Project");
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

// ➕ CREATE PROJECT (admin only)
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admin can create project" });
    }

    const project = await Project.create({
      name: req.body.name,
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// 📥 GET ALL PROJECTS
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ❌ DELETE PROJECT + RELATED TASKS
router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admin can delete" });
    }

    const projectId = req.params.id;

    // Delete related tasks
    const deletedTasks = await Task.deleteMany({ project: projectId });

    // Delete project
    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ msg: "Project not found" });
    }

    res.json({
      msg: "Project + tasks deleted",
      deletedTasks: deletedTasks.deletedCount,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
