import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

const CreateTask = () => {
  const navigate = useNavigate();

  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'taskName') {
      setTaskName(value);
    } else if (name === 'description') {
      setDescription(value);
    } else if (name === 'priority') {
      setPriority(value);
    } else if (name === 'image') {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Name', taskName);
    formData.append('Description', description);
    formData.append('priority', priority);
    if (selectedImage !== null) {
      formData.append('Image', selectedImage);
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const res = await axios.post('http://localhost:8000/api/createTask', formData, config);

   
      console.log(res.data)
      if(res.data.success){
          toast.success(res.data.message)
          setTimeout(() => {
            navigate("/");
          }, 2000);
      }
      else{
        toast.error("something went wrong")
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
        <Toaster position="top-center"></Toaster>
      {/* Include your Navbar or layout component here */}
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-4">Create Task</h2>
          <form onSubmit={handleSave}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-1">Task Name:</label>
              <input
                type="text"
                className="w-full border rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                value={taskName}
                onChange={handleChange}
                name="taskName"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-1">Description:</label>
              <textarea
                className="w-full border rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                value={description}
                onChange={handleChange}
                name="description"
                rows="5"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-1">Priority:</label>
              <select
                className="w-full border rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                value={priority}
                onChange={handleChange}
                name="priority"
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
                className="form-control-file"
                onChange={handleChange}
                name="image"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
