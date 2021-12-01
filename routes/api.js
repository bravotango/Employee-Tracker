const db = require('../db/connection.js');
const departments = require('express').Router();

departments.get('/api/departments', (req, res) => {
  db.query('SELECT * FROM department', function (err, results) {
    res.json(results);
  });
});
