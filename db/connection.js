const mysql = require('mysql2');
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'h!d@d5494',
    database: 'employee_db',
  },
  console.log(`Connected to the employee_db database.`)
);

module.exports = db;
