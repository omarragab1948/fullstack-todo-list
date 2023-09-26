// const Task = require("../models/taskModel");

// // Get all tasks
// exports.getAllTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find();
//     res.status(200).json(tasks);
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//     res.status(500).json({ error: "Could not retrieve tasks" });
//   }
// };

// // Create a new task
// exports.createTask = async (req, res) => {
//   try {
//     const { title, description, date, notes, status } = req.body;
//     const newTask = new Task({ title, description, date, notes, status });
//     const savedTask = await newTask.save();
//     res.status(201).json(savedTask);
//   } catch (error) {
//     console.error("Error adding task:", error);
//     res.status(500).json({ error: "Could not add task" });
//   }
// };

// // Update a task by ID
// exports.updateTask = async (req, res) => {
//   try {
//     const taskId = req.params.taskId;
//     const updatedTask = await Task.findByIdAndUpdate(
//       taskId,
//       req.body,
//       { new: true }
//     );

//     if (!updatedTask) {
//       return res.status(404).json({ error: "Task not found" });
//     }

//     res.status(200).json(updatedTask);
//   } catch (error) {
//     console.error("Error updating task:", error);
//     res.status(500).json({ error: "Could not update task" });
//   }
// };

// // Delete a task by ID
// exports.deleteTask = async (req, res) => {
//   try {
//     const taskId = req.params.taskId;
//     const deletedTask = await Task.findByIdAndRemove(taskId);

//     if (!deletedTask) {
//       return res.status(404).json({ error: "Task not found" });
//     }

//     res.status(200).json(deletedTask);
//   } catch (error) {
//     console.error("Error deleting task:", error);
//     res.status(500).json({ error: "Could not delete task" });
//   }
// };
const Task = require("../models/taskModel");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    console.log(tasks);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve tasks" });
  }
};

const addTask = async (req, res) => {
  try {
    const { title, description, date, notes, status } = req.body;
    const newTask = new Task({
      title,
      description,
      date,
      notes,
      status,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: "Could not add task" });
  }
};

const updatTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
    });
    if (!updatTask) {
      res.status(404).json({ error: "Task Not Found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Could not update task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const deletedTask = await Task.findByIdAndRemove(taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task is deleted" });
  } catch (error) {
    res.status(500).json({ error: "Could not delete task" });
  }
};

module.exports = { getAllTasks, addTask, updatTask, deleteTask };
