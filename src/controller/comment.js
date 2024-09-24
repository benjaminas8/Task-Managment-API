import { v4 as uuidv4 } from "uuid";
import CommentModel from "../model/comment.js";
import TaskModel from "../model/task.js";

const CREATE_TASK_COMMENT = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { userId, commentText } = req.body;

    const comment = new CommentModel({
      taskId,
      userId,
      commentText,
      id: uuidv4(),
    });

    await comment.save();

    // Add comment to the related task
    await TaskModel.findOneAndUpdate(
      { id: taskId },
      { $push: { comments: comment._id } }
    );

    res.status(201).json({ message: "Comment was created", comment });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in creating comment" });
  }
};

const GET_TASK_COMMENTS = async (req, res) => {
  try {
    const { taskId } = req.params;

    const comments = await CommentModel.find({ taskId });

    if (!comments) {
      return res.status(404).json({ message: "No comments found" });
    }

    res.status(200).json({ comments });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in fetching comments" });
  }
};

const DELETE_COMMENT = async (req, res) => {
  try {
    const { commentId } = req.params;

    const deletedComment = await CommentModel.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Optionally, remove the reference from the task
    await TaskModel.findOneAndUpdate(
      { id: req.params.taskId },
      { $pull: { comments: commentId } }
    );

    res
      .status(200)
      .json({ message: "Comment deleted successfully", deletedComment });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in deleting comment" });
  }
};

export { CREATE_TASK_COMMENT, GET_TASK_COMMENTS, DELETE_COMMENT };
