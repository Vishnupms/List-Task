import moment from "moment/moment.js";
import TaskData from "../models/table.js";
import fs from 'fs';
import { dirname, join } from 'path';


export const createTask = async (req, res) => {
  const { Name, Description, priority } = req.body;
  const uploadedImage = req.file; // Uploaded image file

  if (!Name || !Description || !priority || !uploadedImage) {
    return res.status(422).json({ status: 422, message: "Fill all details" });
  }

  try {
    let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
    const newTask = await TaskData.create({
      taskname: Name,
      description: Description,
      taskimage: uploadedImage.filename, // Store the filename or path
      priority: priority,
      date: date,
    });

    console.log("Data added successfully:", newTask.toJSON());
    return res.status(201).json({ status: 201, message:"Task created successfully" });
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
  const taskId = req.params.taskId; // Get the task id from the URL parameter

  try {
    // Find the task by id
    const taskToDelete = await TaskData.findOne({ where: { id: taskId } });

    if (!taskToDelete) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (taskToDelete.taskimage) {
      // Get the directory containing the current module
      const currentModuleDir = dirname(new URL(import.meta.url).pathname);
      const imagePath = join(currentModuleDir, '..', 'uploads', taskToDelete.taskimage);

      // Check if the file exists before attempting deletion
      if (fs.existsSync(imagePath)) {
        try {
          fs.unlinkSync(imagePath); // Delete the file
          console.log(`Image deleted: ${imagePath}`);
        } catch (error) {
          console.error(`Error deleting image: ${imagePath}`, error);
        }
      }
    }

    // Delete the task from the database
    await taskToDelete.destroy();

    return res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};