// const express = require("express");
// const router = express.Router();
// const taskController = require("../controllers/tasksControllers");

// // Define routes related to tasks and chain them
// router
//   .get("/", taskController.getAllTasks)
//   .post("/", taskController.createTask)
//   .put("/:taskId", taskController.updateTask)
//   .delete("/:taskId", taskController.deleteTask);

// module.exports = router;
const express = require("express");
const router = express.Router();
const taskValidationMiddleware = require("../middlewares/taskValidation");
const tasksController = require("../controllers/tasksControllers");
router
  .get("/", tasksController.getAllTasks)
  .post(
    "/",
    taskValidationMiddleware.validateTask,
    taskValidationMiddleware.handleValidationErrors,
    tasksController.addTask
  )
  .put("/:taskId", tasksController.updatTask)
  .delete("/:taskId", tasksController.deleteTask);

module.exports = router;
