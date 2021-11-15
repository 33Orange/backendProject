import TodoRepository from "../TodoRepository/todoRepository.js";
import { ApiError } from "../exceptions/api-error.js";
import TokenService from "./tokenService.js";

class TodoService {
  async getAll(refreshToken) {
    const findedToken = await TokenService.findToken(refreshToken);
    const userId = findedToken.user;
    const todos = await TodoRepository.getAll(userId);
    return todos;
  }

  async create(data, refreshToken) {
    const findedToken = await TokenService.findToken(refreshToken);
    const userId = findedToken.user;
    const todos = await TodoRepository.getAll(userId);
    let sortIndex;

    todos.length == 0
      ? (sortIndex = 1)
      : (sortIndex =
          todos.sort((a, b) => a.sortIndex - b.sortIndex)[todos.length - 1].sortIndex + 1);
    const newTodo = {
      value: data.value,
      isDone: false,
      sortIndex,
      userId,
    };

    const createdTodo = await TodoRepository.create(newTodo);
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

  async deleteCompleted(refreshToken) {
    const findedToken = await TokenService.findToken(refreshToken);
    const userId = findedToken.user;

    const newTodoList = await TodoRepository.deleteCompleted(userId);
    return newTodoList;
  }

  async toggleStatus(status, refreshToken) {
    const findedToken = await TokenService.findToken(refreshToken);
    const userId = findedToken.user;

    const updatedTodoList = await TodoRepository.toggleStatus(status, userId);
    return updatedTodoList;
  }
}

export default new TodoService();
