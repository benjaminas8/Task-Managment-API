import { v4 as uuidv4 } from "uuid";
import TaskModel from "../model/task.js";

const CREATE_TASK = async (req, res) => {
  try {
    const task = {
      userId: req.body.userId,
      taskTitle: req.body.taskTitle,
      taskText: req.body.taskText,
      isCompleted: req.body.isCompleted,
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

    return res.status(200).json({ tasks: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in aplication" });
  }
};

const UPDATE_TASK = (req, res) => {};
const DELETE_TASK = (req, res) => {};

export { CREATE_TASK, GET_ALL_TASKS, GET_TASK_BY_ID, UPDATE_TASK, DELETE_TASK };
