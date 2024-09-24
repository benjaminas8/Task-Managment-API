import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  taskTitle: {
    type: String,
    required: true,
  },
  taskText: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: false,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

export default mongoose.model("Task", taskSchema);
