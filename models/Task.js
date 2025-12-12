const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  priority: { type: String, default: "Medium" },
  ai_reason: String, // explanation from AI
   category: String,
   subtasks: [String], 
    urgencyScore: Number,
  estimatedTime: String, // e.g. "2 hours", "1 day"
  createdAt: {
    type: Date,
    default: () => new Date(new Date().getTime() + 3 * 60 * 60 * 1000),
  },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model("task", taskSchema);
module.exports = Task;
