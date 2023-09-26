const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Task title is required"],
  },
  description: {
    type: String,
  },
  notes: {
    type: String,
  },
  status: {
    type: Boolean,
    required: [true, "Task status is required"],
  },
  date: {
    type: Date,
    required: [true, "Task date is required"],
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
