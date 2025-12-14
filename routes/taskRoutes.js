const express = require("express");
const router = express.Router();
const { analyzeTask } = require("../utils/ai");

const Task = require("../models/Task");
require("body-parser");


router.get("/new", (req, res) => {
  res.render("add-task");
});

router.post("/", async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    // 🔥 Get AI priority + reason
    const { priority, ai_reason, estimatedTime, category,subtasks ,urgencyScore, suggestions} = await analyzeTask(title, description);

    const task = new Task({ title, description, dueDate, priority, ai_reason,estimatedTime, category,subtasks,urgencyScore,suggestions });
     await task.save();
     res.redirect('/');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/all", async (req, res) => {
  try {
    const tasks = await Task.find().sort({urgencyScore:-1});
      res.render("dashboard", { tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).render('error', { error: 'Task not found' });
    }
    res.render('task-detail', { task });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { error: 'Unable to load task' });
  }
});

router.post('/:id/complete', async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, { completed: true });
  res.redirect(`/tasks/${req.params.id}`);
});


router.put("/:id", async (req, res) => {
  try {
    const {
      title,
      description,
      dueDate,
      priority,
      category,
      estimatedTime,
      subtasks
    } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        dueDate,
        priority,
        category,
        estimatedTime,
        subtasks: Array.isArray(subtasks)
          ? subtasks
          : subtasks
          ? [subtasks]
          : [],
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).render("error", { error: "Task not found" });
    }

    // ✅ redirect back to details page
    res.redirect(`/tasks/${updatedTask._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { error: "Failed to update task" });
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).render("error", { error: "Task not found" });
    }
    res.render("edit-task", { task });
  } catch (error) {
    res.status(500).render("error", { error: "Failed to load task" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).render("error", { error: "Task not found" });
    }
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).render("error", { error: "Failed to delete task" });
  }
});

module.exports = router;
