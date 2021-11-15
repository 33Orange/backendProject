import Mongoose from "mongoose";
const { Schema } = Mongoose;

const Todo = new Mongoose.Schema({
  value: { type: String, required: true },
  isDone: { type: Boolean, required: true },
  sortIndex: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

export default Mongoose.model("Todo", Todo);
