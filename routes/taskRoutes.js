const express = require("express");
const router = express.Router();
const { analyzeTask } = require("../utils/ai");

const Task = require("../models/Task");
require("body-parser");
router.post("/add", async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    // 🔥 Get AI priority + reason
    const { priority, ai_reason, estimatedTime, category,subtasks } = await analyzeTask(title, description);

    const task = new Task({ title, description, dueDate, priority, ai_reason,estimatedTime, category,subtasks });
    const savedTask = await task.save();
    res.status(200).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
    console.log(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/task/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedTask)
      return res.status(404).json({ message: "Task not found" });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
