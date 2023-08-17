import React from 'react';


const TaskFilter = ({ priorityFilter, setPriorityFilter }) => {
  const handleFilterChange = (e) => {
    setPriorityFilter(e.target.value);
  };

  return (
    <div className="mt-4">
      <label className="mr-2">Filter by Priority:</label>
      <select
        value={priorityFilter}
        onChange={handleFilterChange}
        className="border border-gray-300 p-1 rounded"
      >
        <option value="all">All</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
};

export default TaskFilter;
