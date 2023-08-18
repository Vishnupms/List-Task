import moment from "moment/moment.js";
import TaskData from "../models/table.js";
import fs from 'fs';
import { fileURLToPath } from 'url'
import path, { dirname, join } from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


export const createTask = async (req, res) => {
  const { Name, Description, priority } = req.body;
  const uploadedImage = req.file; 

  if (!Name || !Description || !priority || !uploadedImage) {
    return res.status(422).json({ status: 422, message: "Fill all details" });
  }

  try {
    let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
    const newTask = await TaskData.create({
      taskname: Name,
      description: Description,
      taskimage: uploadedImage.filename, 
      priority: priority,
      date: date,
    });

    console.log("Data added successfully:", newTask.toJSON());
    return res.status(201).json({ success:true, message:"Task created successfully" });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

export const getAllTask = async (req, res) => {
  try {
    const allTasks = await TaskData.findAll();
    return res.status(200).json(allTasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const deleteTask = async (req, res) => {
  const taskId = req.params.taskId; 

  try {
    const taskToDelete = await TaskData.findOne({ where: { id: taskId } });

    if (!taskToDelete) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (taskToDelete.taskimage) {
      const currentModuleDir = dirname(new URL(import.meta.url).pathname);
      const imagePath = path.join(currentModuleDir, '..', 'uploads', taskToDelete.taskimage);

      if (fs.existsSync(imagePath)) {
        try {
          fs.unlinkSync(imagePath); 
          console.log(`Image deleted: ${imagePath}`);
        } catch (error) {
          console.error(`Error deleting image: ${imagePath}`, error);
        }
      }
    }

    await taskToDelete.destroy();

    return res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  const taskId = req.params.taskId; 

  try {
 
    const taskToUpdate = await TaskData.findOne({ where: { id: taskId } });

    if (!taskToUpdate) {
      return res.status(404).json({ message: 'Task not found' });
    }


    taskToUpdate.taskname = req.body.taskname;
    taskToUpdate.description = req.body.description;
    taskToUpdate.priority = req.body.priority;

    if (req.file) {
      const imagePath = path.join(__dirname, '..', 'uploads', taskToUpdate.taskimage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }

      taskToUpdate.taskimage = req.file.filename;
    }

    await taskToUpdate.save();

    return res.status(200).json({ success: true, message: 'Task updated successfully' });
  } catch (error) {
    console.error('Error updating task:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};