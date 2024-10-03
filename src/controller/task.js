import { v4 as uuidv4 } from "uuid";
import TaskModel from "../model/task.js";

const CREATE_TASK = async (req, res) => {
  try {
    const task = {
      userId: req.body.userId || null,
      taskTitle: req.body.taskTitle,
      taskText: req.body.taskText,
      isCompleted: req.body.isCompleted || false,
      id: uuidv4(),
    };

    const response = await new TaskModel(task);

    await response.save();

    res.status(201).json({ message: "task was created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in aplication" });
  }
};

const GET_ALL_TASKS = async (req, res) => {
  try {
    const response = await TaskModel.find();
    return res.status(200).json({ tasks: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in aplication" });
  }
};
const GET_TASK_BY_ID = async (req, res) => {
  try {
    const response = await TaskModel.findOne({ id: req.params.id });
    console.log(response);

    return res.status(200).json({ task: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in aplication" });
  }
};

const UPDATE_TASK = (req, res) => {
  // Jei liks laiko
};
const DELETE_TASK = async (req, res) => {
  try {
    const response = await TaskModel.findOneAndDelete({ id: req.params.id });

    if (!response) {
      return res.status(404).json({
        message: "This task does not exist so you cannot delete it",
      });
    }

    return res
      .status(200)
      .json({ message: "Task was deleted successfully", task: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in aplication" });
  }
};

export { CREATE_TASK, GET_ALL_TASKS, GET_TASK_BY_ID, UPDATE_TASK, DELETE_TASK };
