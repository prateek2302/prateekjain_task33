import React from 'react';
import '../styles/Filters.css';

const Filters = ({ onFilterChange, onSearch, currentFilters }) => {
  const handleStatusChange = (e) => {
    onFilterChange({ ...currentFilters, status: e.target.value });
  };

  const handlePriorityChange = (e) => {
    onFilterChange({ ...currentFilters, priority: e.target.value });
  };

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  const handleReset = () => {
    onFilterChange({ status: '', priority: '', search: '' });
  };

  return (
    <div className="filters-container">
      <h3>Filter Todos</h3>
      
      <div className="filter-group">
        <input
          type="text"
          placeholder="Search todos..."
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div className="filter-row">
        <div className="filter-group">
          <label htmlFor="status-filter">Status</label>
          <select
            id="status-filter"
            value={currentFilters.status || ''}
            onChange={handleStatusChange}
            className="filter-select"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="priority-filter">Priority</label>
          <select
            id="priority-filter"
            value={currentFilters.priority || ''}
            onChange={handlePriorityChange}
            className="filter-select"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button onClick={handleReset} className="reset-btn">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filters;
