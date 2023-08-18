import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
const CreateTaskPopup = ({ modal, toggle, save }) => {
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
    formData.append('Image', selectedImage);
  
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
  
      const res = await axios.post("http://localhost:8000/api/createList", formData, config);
  
      // Call the save function and pass both formData and res.data
      console.log(res.data)
      save(res.data);
  
    
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Task</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Task Name</label>
          <input
            type="text"
            className="form-control"
            value={taskName}
            onChange={handleChange}
            name="taskName"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="5"
            className="form-control"
            value={description}
            onChange={handleChange}
            name="description"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Priority</label>
          <select
            className="form-control"
            value={priority}
            onChange={handleChange}
            name="priority"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            className="form-control-file"
            onChange={handleChange}
            name="image"
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>
          Create
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateTaskPopup;
