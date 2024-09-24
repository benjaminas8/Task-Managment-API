import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import tasksRouter from "./src/route/task.js";
import useRouter from "./src/route/user.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Connected!"))
  .catch((err) => {
    console.log(err);
  });

app.use(tasksRouter);
app.use(useRouter);

app.use((req, res) => {
  return res.status(404).json({ message: "this end point does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log(`your app started on ${process.env.PORT} port`);
});
