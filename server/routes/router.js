import express from "express";
import multer from "multer";
import * as controller from '../controllers/taskController.js'

const router = express.Router();

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Set the filename
  }
});

const upload = multer({ storage: storage });

// Handle POST request
router.post("/createTask", upload.single('Image'),controller.createTask);
router.get("/getTask", controller.getAllTask);
router.delete('/deleteTask/:taskId', controller.deleteTask);
router.put('/updateTask/:taskId', upload.single('image'), controller.updateTask);


export default router;