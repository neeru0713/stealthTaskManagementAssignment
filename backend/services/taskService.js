const Task = require("../models/Task");

const createTask = async (taskData) => {
  const task = new Task(taskData);
  return await task.save();
};

const getUserTasks = async (userId) => {
  return await Task.find({ userId });
};

const getTaskById = async (id, userId) => {
  return await Task.findOne({ _id: id, userId });
};

const updateTask = async (id, userId, updatedFields) => {
  return await Task.findOneAndUpdate({ _id: id, userId }, updatedFields, {
    new: true,
  });
};

const deleteTask = async (id, userId) => {
  return await Task.findOneAndDelete({ _id: id, userId });
};

module.exports = {
  createTask,
  getUserTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
