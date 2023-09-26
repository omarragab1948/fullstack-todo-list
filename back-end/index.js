// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const port = 3000;
// dotenv.config(); // Load environment variables from .env

// // MongoDB connection
// const mongoURI = process.env.MONGO_URL; // Replace with your MongoDB URI

// mongoose.connect(mongoURI).then(() => {
//   console.log("Connected to MongoDB");
// });

// // Middleware to parse JSON requests
// app.use(express.json());

// // Import and use the task routes
// const taskRoutes = require("./routes/tasksRoutes");
// app.use("/api/tasks", taskRoutes);

// // Start the Express server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const taskRoutes = require("./routes/tasksRoutes");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;
mongoose.connect(uri).then(() => {
  console.log("mongo is connected");
});

app.use("/api/tasks", taskRoutes);

app.listen(3000, () => {
  console.log("server on 3000");
});
