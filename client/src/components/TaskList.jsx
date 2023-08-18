import React, { useEffect, useState } from 'react';
import TaskFilter from './TaskFilter';
import axios from 'axios';
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';





const TaskList = () => {
  const [taskList, setTaskList] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState('all')
  const navigate = useNavigate()
   useEffect(() => {
    fetchData();
  }, []);
   const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/getTask'); // Change the URL to your backend API endpoint
      setTaskList(response.data); // Update the taskList state with the fetched data
      console.log(response.data,"csjcbjsb c")
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/deleteTask/${taskId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  };
  const navigateToUpdatePage = (task) => {
    navigate('/edit', { state: { taskData: task } });
  };

  

  const filteredTasks =
    priorityFilter === 'all'
      ? taskList
      : taskList.filter((task) => task.priority === priorityFilter)

  return (
    <>
    <Toaster position="top-center"></Toaster>
    <div className="container mx-auto p-4">
      <div className="header text-center">
        <h3 className="text-2xl font-semibold mb-4">Todo List</h3>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={()=>navigate("/create")}
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
              <th className="py-2">Created At</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
          {filteredTasks.map((task, index) => (
    <tr className="hover:bg-gray-200" key={index}>
      <td className="hover:text-blue-600 cursor-pointer" onClick={()=>navigate("/show",{ state: { taskData: task } })}>{task.taskname}</td>
      <td>{task.description}</td>
      <td>
        {task.taskimage && (
          <img src={`http://localhost:8000/uploads/${task.taskimage}`} alt="Task" className="w-16 h-16" />
        )}
      </td>
      <td>{new Date(task.createdAt).toLocaleString()}</td>
      <td>
        <i
          className="far fa-edit text-blue-500 cursor-pointer mr-2"
          onClick={() => navigateToUpdatePage(task)}
        ></i>
        <i
          className="fas fa-trash-alt text-red-500 cursor-pointer"
          onClick={() => deleteTask(task.id)}
        ></i>
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default TaskList;
