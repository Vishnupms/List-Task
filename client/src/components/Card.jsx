import React, { useState } from 'react';
import EditTask from '../modals/EditTask';

const Card = ({ taskObj, index, deleteTask, updateListArray }) => {
  const [modal, setModal] = useState(false);

  const colors = [
    "#5D93E1",
    "#F9D288",
    "#5DC250",
    "#F48687",
    "#B964F7",
  ];

  const toggle = () => {
    setModal(!modal);
  }

  const updateTask = (obj) => {
    updateListArray(obj, index);
  }

  const handleDelete = () => {
    deleteTask(index);
  }

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
      <div className={`card-wrapper h-60 rounded-md shadow-md bg-white`}>
        <div className={`card-top w-full h-2 bg-${colors[index % 5]}-500`}></div>
        <div className={`task-holder w-full h-58 p-4 relative flex flex-col`}>
          <span className={`card-header bg-${colors[index % 5]}-100 text-center rounded-full py-1 px-2`}>{taskObj.Name}</span>
          <p className={`mt-3 flex-grow`}>{taskObj.Description}</p>

          <div style={{"position": "absolute", "right" : "20px", "bottom" : "20px"}}>
            <i className={`far fa-edit mr-3 text-${colors[index % 5]}-500 cursor-pointer`} onClick={() => setModal(true)}></i>
            <i className={`fas fa-trash-alt text-${colors[index % 5]}-500 cursor-pointer`} onClick={handleDelete}></i>
          </div>
        </div>
        <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj}/>
      </div>
    </div>
  );
};

export default Card;
