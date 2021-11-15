import TodoRepository from "../TodoRepository/todoRepository.js";
import { ApiError } from "../exceptions/api-error.js";
import { io } from "../server.js";

class TodoService {
  async getAll() {
    const todos = await TodoRepository.getAll();
    return todos;
  }

  async create(data) {
    const todos = await TodoRepository.getAll();
    let sortIndex;

    todos.length == 0
      ? (sortIndex = 1)
      : (sortIndex =
          todos.sort((a, b) => a.sortIndex - b.sortIndex)[todos.length - 1].sortIndex + 1);
    const newTodo = {
      value: data.value,
      isDone: false,
      sortIndex,
    };

    const createdTodo = await TodoRepository.create(newTodo);
    io.emit("ADD-TODO", createdTodo);
    return createdTodo;
  }

  async update(todo) {
    if (!todo._id) {
      throw ApiError.Badupdate(`Bad request for update`);
    }
    const updatedTodo = await TodoRepository.update(todo);
    return updatedTodo;
  }

  async delete(id) {
    if (!id) {
      throw new Error("Id not founded");
    }
    const todo = await TodoRepository.delete(id);
    return todo;
  }

  async deleteCompleted() {
    const newTodoList = await TodoRepository.deleteCompleted();
    return newTodoList;
  }

  async toggleStatus(status) {
    const updatedTodoList = await TodoRepository.toggleStatus(status);
    return updatedTodoList;
  }
}

export default new TodoService();
