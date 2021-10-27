import TodoRepository from '../TodoRepository/todoRepository.js';

class TodoService {
  async getAll() {
    const todos = await TodoRepository.getAll();
    return todos;
  }

  async create(todo) {
    const createdTodo = await TodoRepository.create(todo);
    return createdTodo;
  }

  async update(todo) {
    if (!todo._id) {
      throw new Error('Id not founded');
    }
    const updatedTodo = await TodoRepository.update(todo);
    return updatedTodo;
  }

  async delete(id) {
    if (!id) {
      throw new Error('Id not founded');
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
