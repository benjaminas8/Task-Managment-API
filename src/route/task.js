import express from "express";

import {
  CREATE_TASK,
  GET_ALL_TASKS,
  GET_TASK_BY_ID,
  UPDATE_TASK,
  DELETE_TASK,
} from "../controller/task.js";

const router = express.Router();

router.post("/tasks", CREATE_TASK);
router.get("/tasks", GET_ALL_TASKS);
router.get("/tasks/:id", GET_TASK_BY_ID);
router.put("/tasks/:id", UPDATE_TASK);
router.delete("/tasks/:id", DELETE_TASK);

export default router;
