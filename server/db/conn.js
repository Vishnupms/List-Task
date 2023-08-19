import mysql from 'mysql2/promise';

const conn = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Vishnu123#',
  database: 'listtask'
});

try {
  await conn.execute('SELECT 1'); // Test the connection
  console.log('Database connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default conn;
