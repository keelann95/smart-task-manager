const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  priority: String, // High, Medium, Low
  ai_reason: String, // explanation from AI
  createdAt: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model("task", taskSchema);
module.exports = Task;
