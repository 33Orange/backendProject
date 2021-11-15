import Todo from "../models/todo.js";

class TodosRepository {
  getAll(userId) {
    return Todo.find({ userId });
  }
  async create(todo) {
    return Todo.create(todo);
  }
  update(todo) {
    return Todo.findByIdAndUpdate(todo._id, todo, { new: true });
  }
  delete(id) {
    return Todo.findByIdAndDelete(id);
  }
  async deleteCompleted(userId) {
    await Todo.deleteMany({ userId, isDone: true });
    return Todo.find({ userId });
  }
  async toggleStatus(status, userId) {
    await Todo.updateMany({ userId, isDone: status });
    return Todo.find({ userId });
  }
}

export default new TodosRepository();
