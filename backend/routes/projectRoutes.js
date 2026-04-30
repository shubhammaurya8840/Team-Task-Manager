const express = require("express");
const router = express.Router();

const Project = require("../models/Project");
const Task = require("../models/Task"); // 🔥 MUST

// DELETE PROJECT + RELATED TASKS
router.delete("/:id", async (req, res) => {
  try {
    const projectId = req.params.id;

    console.log("Deleting Project:", projectId);

    // 🔥 Step 1: Delete tasks linked to project
    const deletedTasks = await Task.deleteMany({ project: projectId });

    console.log("Deleted tasks count:", deletedTasks.deletedCount);

    // 🔥 Step 2: Delete project
    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ msg: "Project not found" });
    }

    res.json({
      msg: "Project + tasks deleted",
      deletedTasks: deletedTasks.deletedCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
