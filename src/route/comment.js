import express from "express";

import {
  CREATE_TASK_COMMENT,
  GET_TASK_COMMENTS,
  DELETE_COMMENT,
} from "../controller/comment.js";

const router = express.Router();

router.post("/tasks/:taskId/comments", CREATE_TASK_COMMENT);
router.get("/tasks/:taskId/comments", GET_TASK_COMMENTS);
router.delete("/comment/:commentId", DELETE_COMMENT);

export default router;
