import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  taskId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  commentText: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Comment", commentSchema);
