import Mongoose from "mongoose";

const Todo = new Mongoose.Schema({
  value: { type: String, required: true },
  isDone: { type: Boolean, required: true },
  sortIndex: { type: Number, required: true },
});

export default Mongoose.model("Todo", Todo);
