import moment from 'moment/moment.js';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';
import conn from '../db/conn.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


export const createTask = async (req, res) => {
  const { Name, Description, priority } = req.body;
  const uploadedImage = req.file;

  if (!Name || !Description || !priority || !uploadedImage) {
    return res.status(422).json({ status: 422, message: "Fill all details" });
  }

  try {
    const date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
    const insertQuery = `
      INSERT INTO datas (taskname, description, taskimage, priority, date)
      VALUES (?, ?, ?, ?, ?)
    `;
    await conn.query(insertQuery, [
      Name,
      Description,
      uploadedImage.filename,
      priority,
      date
    ]);

    console.log("Data added successfully");
    return res.status(201).json({ success: true, message: "Task created successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};
export const getAllTask = async (req, res) => {
  try {
    const selectQuery = `
      SELECT * FROM datas
    `;
    const [rows] = await conn.query(selectQuery);

    return res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteTask = async (req, res) => {
  const taskId = req.params.taskId;

  try {
    // Get the task to delete
    const selectQuery = `
      SELECT * FROM datas WHERE id = ?
    `;
    const [taskToDeleteRows] = await conn.query(selectQuery, [taskId]);
    const taskToDelete = taskToDeleteRows[0];

    if (!taskToDelete) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (taskToDelete.taskimage) {
      const imagePath = path.join(__dirname, '..', 'uploads', taskToDelete.taskimage);

      try {
        await fs.access(imagePath, fs.constants.F_OK);
        await fs.unlink(imagePath);
        console.log(`Image deleted: ${imagePath}`);
      } catch (error) {
        console.error(`Error deleting image: ${imagePath}`, error);
      }
    }

    // Delete the task
    const deleteQuery = `
      DELETE FROM datas WHERE id = ?
    `;
    await conn.query(deleteQuery, [taskId]);

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
    const selectQuery = `
      SELECT * FROM datas WHERE id = ?
    `;
    const [taskToUpdateRows] = await conn.query(selectQuery, [taskId]);
    const taskToUpdate = taskToUpdateRows[0];

    if (!taskToUpdate) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const updateQuery = `
      UPDATE datas SET
        taskname = ?,
        description = ?,
        priority = ?,
        taskimage = ?
      WHERE id = ?
    `;

    const newTaskName = req.body.taskname;
    const newDescription = req.body.description;
    const newPriority = req.body.priority;
    const newTaskImage = req.file ? req.file.filename : taskToUpdate.taskimage;

    await conn.query(updateQuery, [newTaskName, newDescription, newPriority, newTaskImage, taskId]);

    if (req.file) {
      const imagePath = path.join(__dirname, '..', 'uploads', taskToUpdate.taskimage);
      try {
        await fs.access(imagePath, fs.constants.F_OK);
        await fs.unlink(imagePath);
        console.log(`Image deleted: ${imagePath}`);
      } catch (error) {
        console.error(`Error deleting image: ${imagePath}`, error);
      }
    }

    return res.status(200).json({ success: true, message: 'Task updated successfully' });
  } catch (error) {
    console.error('Error updating task:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};