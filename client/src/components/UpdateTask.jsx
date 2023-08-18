import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const UpdateTaskForm = () => {

    const location = useLocation();
    const taskData = location.state.taskData;
    const navigate = useNavigate()

  const [taskName, setTaskName] = useState(taskData.taskname);
  const [description, setDescription] = useState(taskData.description);
  const [priority, setPriority] = useState(taskData.priority);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
formData.append('taskname', taskName);
formData.append('description', description);
formData.append('priority', priority);
formData.append('image', selectedImage);
 

    try {
        const response = await axios.put(
            `http://localhost:8000/api/updateTask/${taskData.id}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
      console.log(response.data);
      toast.success(response.data.message)
      setTimeout(() => {
        navigate("/");
      }, 2000);
      // Handle success, navigate back to the task list or show a success message
    } catch (error) {
      console.error('Error updating task:', error);
      // Handle error, show an error message
    }
  };

  return (
    <>
    <Toaster position="top-center"></Toaster>
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-1">Task Name:</label>
            <input
              type="text"
              className="w-full border rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:border-blue-500"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-1">Description:</label>
            <textarea
              className="w-full border rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:border-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-1">Priority:</label>
            <select
              className="w-full border rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:border-blue-500"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-1">Image:</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:border-blue-500"
              onChange={handleImageChange}
              name="image"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default UpdateTaskForm;