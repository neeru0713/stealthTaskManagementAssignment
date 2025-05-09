const taskService = require("../services/taskService");

const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getUserTasks(req.user.id);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id, req.user.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(
      req.params.id,
      req.user.id,
      req.body
    );
    if (!task)
      return res.status(404).json({ error: "Task not found or not yours" });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await taskService.deleteTask(req.params.id, req.user.id);
    if (!task)
      return res.status(404).json({ error: "Task not found or not yours" });
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask };
