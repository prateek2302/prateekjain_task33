const TodoService = require('../services/TodoService');

class TodoController {
  async getAllTodos(req, res) {
    try {
      const filters = {
        status: req.query.status,
        priority: req.query.priority,
        search: req.query.search,
      };
      const todos = await TodoService.getAllTodos(filters);
      res.status(200).json({
        success: true,
        message: 'Todos retrieved successfully',
        data: todos,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getTodoById(req, res) {
    try {
      const todo = await TodoService.getTodoById(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Todo retrieved successfully',
        data: todo,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async createTodo(req, res) {
    try {
      const todo = await TodoService.createTodo(req.body);
      res.status(201).json({
        success: true,
        message: 'Todo created successfully',
        data: todo,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateTodo(req, res) {
    try {
      const todo = await TodoService.updateTodo(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: 'Todo updated successfully',
        data: todo,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteTodo(req, res) {
    try {
      const todo = await TodoService.deleteTodo(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Todo deleted successfully',
        data: todo,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateStatus(req, res) {
    try {
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({
          success: false,
          message: 'Status is required',
        });
      }
      const todo = await TodoService.updateStatus(req.params.id, status);
      res.status(200).json({
        success: true,
        message: 'Todo status updated successfully',
        data: todo,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new TodoController();
