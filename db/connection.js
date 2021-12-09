const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'h!d@d5494',
  database: 'employee_db',
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
