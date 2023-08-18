import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const ShowTask = () => {
    const location = useLocation();
    const task = location.state.taskData;

  return (
    <div className="bg-gray-100 min-h-screen ">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6 ">
        <h2 className="text-2xl font-semibold mb-4">{task.taskname}</h2>
        <p className="text-gray-600 mb-4">{task.description}</p>
        {task.taskimage && (
          <img
            src={`http://localhost:8000/uploads/${task.taskimage}`}
            alt="Task"
            className="w-full rounded-md mb-4"
          />
        )}
        <p className="text-gray-500">
          Priority: {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </p>
        <div className="mt-4">
          <Link
            to="/"
            className="inline-block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Back to Task List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowTask;
