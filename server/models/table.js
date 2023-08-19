// import Sequelize from 'sequelize';
// import conn from '../db/conn.js';

// const TaskData = conn.define('taskdata', {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   taskname: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.TEXT,
//     allowNull: false,
//   },
//   taskimage: {
//     type: Sequelize.STRING(255), 
//     allowNull: false,
//   },
//   priority: {
//     type: Sequelize.ENUM('low', 'medium', 'high'),
//     allowNull: false,
//   },
//   date: {
//     type: Sequelize.DATE,
//     allowNull: false,
//   },
// });
// TaskData.sync()
//   .then(() => {
//     console.log("TaskData table synchronized successfully");
//   })
//   .catch((error) => {
//     console.error("Error synchronizing TaskData table:", error);
//   });

// export default TaskData;
