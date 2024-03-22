// controllers/taskController.js
const jwt=require("jsonwebtoken")
const Task = require("../models/Task");
const User = require("../models/User");
// const  userEmail=localStorage.getItem('email')
// Controller function to get all tasks

exports.getAllTasks = async (req, res) => {
  try {
    // const {user_id}= req.body;
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, userEmail } = req.body;
    // const user= await User.findOne({email})
    const task = new Task({ title, description ,userEmail});
    // console.log(task);
    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to update an existing task
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const {completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {completed },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to delete a task
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
