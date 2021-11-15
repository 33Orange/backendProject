import TodoService from "../service/todoService.js";

class TodosController {
  async create(req, res) {
    try {
      const newTodo = await TodoService.create(req.body, req.user);
      res.json(newTodo);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getAll(req, res) {
    try {
      const todos = await TodoService.getAll(req.user);
      return res.json(todos);
    } catch (e) {
      console.log(e);
      res.status(500).json(e.message);
    }
  }

  async update(req, res) {
    try {
      const updatedTodo = await TodoService.update(req.body);
      return res.json(updatedTodo);
    } catch (e) {
      res.status(419).json(e);
    }
  }

  async delete(req, res) {
    try {
      const deletedTodo = await TodoService.delete(req.params.id);
      return res.json(deletedTodo);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async deleteCompleted(req, res) {
    try {
      if (req.query.cleardone) {
        const updatedList = await TodoService.deleteCompleted(req.user);
        return res.json(updatedList);
      }
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async toggleStatus(req, res) {
    try {
      const updatedList = await TodoService.toggleStatus(req.body.status, req.user);
      return res.json(updatedList);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new TodosController();
