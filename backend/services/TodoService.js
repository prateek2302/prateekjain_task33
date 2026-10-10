const Todo = require('../models/Todo');

class TodoService {
  async getAllTodos(filters = {}) {
    try {
      const query = {};
      if (filters.status) query.status = filters.status;
      if (filters.priority) query.priority = filters.priority;
      if (filters.search) {
        query.$or = [
          { title: { $regex: filters.search, $options: 'i' } },
          { description: { $regex: filters.search, $options: 'i' } },
        ];
      }
      return await Todo.find(query).sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(`Error fetching todos: ${error.message}`);
    }
  }

  async getTodoById(id) {
    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error('Invalid todo ID');
      }
      const todo = await Todo.findById(id);
      if (!todo) throw new Error('Todo not found');
      return todo;
    } catch (error) {
      throw new Error(`Error fetching todo: ${error.message}`);
    }
  }

  async createTodo(data) {
    try {
      if (!data.title || data.title.trim() === '') {
        throw new Error('Title is required');
      }
      const todo = new Todo(data);
      return await todo.save();
    } catch (error) {
      throw new Error(`Error creating todo: ${error.message}`);
    }
  }

  async updateTodo(id, data) {
    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error('Invalid todo ID');
      }
      const todo = await Todo.findByIdAndUpdate(
        id,
        { ...data, updatedAt: Date.now() },
        { new: true, runValidators: true }
      );
      if (!todo) throw new Error('Todo not found');
      return todo;
    } catch (error) {
      throw new Error(`Error updating todo: ${error.message}`);
    }
  }

  async deleteTodo(id) {
    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error('Invalid todo ID');
      }
      const todo = await Todo.findByIdAndDelete(id);
      if (!todo) throw new Error('Todo not found');
      return todo;
    } catch (error) {
      throw new Error(`Error deleting todo: ${error.message}`);
    }
  }

  async updateStatus(id, status) {
    try {
      if (!['pending', 'in-progress', 'completed'].includes(status)) {
        throw new Error('Invalid status');
      }
      return await this.updateTodo(id, { status });
    } catch (error) {
      throw new Error(`Error updating status: ${error.message}`);
    }
  }
}

module.exports = new TodoService();
