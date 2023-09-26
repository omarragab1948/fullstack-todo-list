import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    notes: "",
    date: new Date(),
    status: false,
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateTask, setUpdateTask] = useState({
    title: "",
    description: "",
    notes: "",
    date: new Date(),
    status: false,
  });

  const [addMode, setAddMode] = useState(true);

  const getTasks = () => {
    axios
      .get("http://localhost:3000/api/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleInputChangeUpdate = (e) => {
    const { name, value } = e.target;
    setUpdateTask({ ...updateTask, [name]: value });
  };

  const handleAddTask = () => {
    axios
      .post("http://localhost:3000/api/tasks", newTask)
      .then((response) => {
        getTasks();
        resetForm();
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  const handleUpdateTask = () => {
    axios
      .put(`http://localhost:3000/api/tasks/${updateTask._id}`, updateTask)
      .then((response) => {
        getTasks();
        setIsUpdating(false);
        resetForm();
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  const handleDeleteTask = (taskId) => {
    axios
      .delete(`http://localhost:3000/api/tasks/${taskId}`)
      .then(() => {
        getTasks();
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  const startUpdate = (task) => {
    setIsUpdating(true);
    setUpdateTask({ ...task });
    setAddMode(false);
  };

  const resetForm = () => {
    setNewTask({
      title: "",
      description: "",
      notes: "",
      date: new Date(),
      status: false,
    });
    setUpdateTask({
      title: "",
      description: "",
      notes: "",
      date: new Date(),
      status: false,
    });
    setIsUpdating(false);
    setAddMode(true);
  };

  return (
    <div>
      <h1>Task List</h1>
      <ul className="tasks">
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>Title: {task.title}</strong>
            <p>Description: {task.description}</p>
            <p>Notes: {task.notes}</p>
            <span>Date: {new Date(task.date).toISOString().split("T")[0]}</span>
            <span>Status: {task.status ? "Completed" : "Uncompleted"}</span>
            <div className="buttons">
              <button className="update" onClick={() => startUpdate(task)}>
                Update
              </button>
              <button
                className="delete"
                onClick={() => handleDeleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className='inputs'>
      <h2>{isUpdating ? "Update Task" : "Add New Task"}</h2>
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={addMode ? newTask.title : updateTask.title}
        onChange={addMode ? handleInputChange : handleInputChangeUpdate}
      />
      <input
        type="text"
        placeholder="Description"
        name="description"
        value={addMode ? newTask.description : updateTask.description}
        onChange={addMode ? handleInputChange : handleInputChangeUpdate}
      />
      <input
        type="text"
        placeholder="Notes"
        name="notes"
        value={addMode ? newTask.notes : updateTask.notes}
        onChange={addMode ? handleInputChange : handleInputChangeUpdate}
      />
      {addMode ? (
        <button onClick={handleAddTask}>Add Task</button>
      ) : (
        <button onClick={handleUpdateTask}>Update Task</button>
      )}
      </div>
    </div>
  );
};

export default App;
