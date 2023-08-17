import mysql from 'mysql2'


const conn = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"Vishnu123#",
    database:"task-list"
});

conn.connect((error)=>{
    if(error) throw error
    console.log("connected !")
})


export default conn