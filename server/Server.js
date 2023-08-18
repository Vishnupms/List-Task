import express from 'express';
import cors from 'cors'
import './db/conn.js'
import router from './routes/router.js';
const app = express()
const port = 8000


app.use(cors())
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/api',router)



app.listen(port,()=>{
    console.log(`server started on port:${port}`)
})