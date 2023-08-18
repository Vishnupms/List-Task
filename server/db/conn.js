import Sequelize from 'sequelize';

const conn = new Sequelize('tasklist', 'root', 'Vishnu123#', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

conn
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

  
export default conn;