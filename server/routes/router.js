import express from "express";
import multer from "multer";
import conn from "../db/conn.js";
const router = express.Router()

//img storage config
let imageconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads")
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}.${file.originalname}`)
    }
})

router.post("/createList",(req,res)=>{

})


export default router