import React, { useEffect, useState } from 'react';
import CreateTask from '../modals/CreateTask';
import TaskFilter from './TaskFilter';




const TaskList = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState('all');


  const deleteTask = (index) => {
    const updatedList = taskList.filter((_, i) => i !== index);
    setTaskList(updatedList);
  };
  // const updateListArray = (obj, index) => {
  //   const updatedList = taskList.map((task, i) => (i === index ? obj : task));
  //   localStorage.setItem('taskList', JSON.stringify(updatedList));
  //   setTaskList(updatedList);
  // };

  const toggle = () => {
    setModal(!modal);
  };

  const saveTask = (taskObj) => {
    const updatedList = [...taskList, taskObj];
    setTaskList(updatedList);
    setModal(false);
  };

  const filteredTasks =
    priorityFilter === 'all'
      ? taskList
      : taskList.filter((task) => task.priority === priorityFilter)

  return (
    <div className="container mx-auto p-4">
      <div className="header text-center">
        <h3 className="text-2xl font-semibold mb-4">Todo List</h3>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={toggle}
        >
          Create Task
        </button>
      </div>
      <TaskFilter
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
      />
      <div className="task-container overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2">Task</th>
              <th className="py-2">Description</th>
              <th className="py-2">Image</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
  {filteredTasks.map((task, index) => (
    <tr className="hover:bg-gray-200 cursor-pointer" key={index}>
      <td>{task.Name}</td>
      <td>{task.Description}</td>
      <td>
      {task.Image && (
                    <img src={URL.createObjectURL(task.Image)} alt="Task" className="w-16 h-16" />
                  )}
      </td>
      <td>
        <i
          className="far fa-edit text-blue-500 cursor-pointer mr-2"
          onClick={() => setModal(true)}
        ></i>
        <i
          className="fas fa-trash-alt text-red-500 cursor-pointer"
          onClick={() => deleteTask(index)}
        ></i>
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
      <CreateTask toggle={toggle} modal={modal} save={saveTask} />
    </div>
  );
};

export default TaskList;
