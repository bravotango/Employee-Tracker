const mysql = require('mysql2');

const connection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'h!d@d5494',
    database: 'employee_db',
  },
  console.log(`Connected to the employee_db database.`)
);

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
