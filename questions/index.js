const { response } = require('express');
const inquirer = require('inquirer');
const cTable = require('console.table');

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

const displayJsonAsTable = (t) => {
  const table = cTable.getTable(t);
  console.log(table);
};

function viewDepartments() {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, data) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    displayJsonAsTable(data);
  });
}

const questionTypes = {
  ViewDepartments: '= View all departments',
  ViewRoles: '= View all roles',
  ViewAllEmployees: '= View all employees',
  AddDepartment: '+ Add a department',
  AddRole: '+ Add a role',
  AddEmployee: '+ Add an employee',
  UpdateRole: '/ Update an employee role',
};

const validation = {
  required: (response) => {
    return response ? true : console.error('Required answer. Try again...');
  },
};

const questions = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'whatTask',
        choices: [
          questionTypes.ViewDepartments,
          questionTypes.ViewAllEmployees,
          questionTypes.ViewAllEmployees,
          questionTypes.AddDepartment,
          questionTypes.AddRole,
          questionTypes.AddEmployee,
          questionTypes.UpdateRole,
        ],
      },
    ])
    .then((answers) => {
      switch (answers.whatTask) {
        case questionTypes.ViewDepartments: {
          console.log('view departments found!!!');
          viewDepartments();
        }
      }
      inquirer.prompt([
        {
          type: 'input',
          message: 'What is the name of the department?',
          name: 'departmentName',
          when: answers.whatTask === questionTypes.AddDepartment,
          validate: (response) => validation.required(response),
        },
        {
          type: 'input',
          message: 'What is the name of the role?',
          name: 'roleName',
          when: answers.whatTask === questionTypes.AddRole,
          validate: (response) => validation.required(response),
        },
        {
          type: 'input',
          message: 'What is the salary of the role? $',
          name: 'roleSalary',
          when: answers.whatTask === questionTypes.AddRole,
          validate: (response) => validation.required(response),
        },
        {
          type: 'list',
          message: 'Which department does the role belong to?',
          name: 'roleDepartment',
          choices: ['Get', 'list', 'from', 'query', 'to', 'db'],
          when: answers.whatTask === questionTypes.AddRole,
        },
        {
          type: 'input',
          message: "What is the employee's first name?",
          name: 'employeeFirstName',
          when: answers.whatTask === questionTypes.AddEmployee,
          validate: (response) => validation.required(response),
        },
        {
          type: 'input',
          message: "What is the employee's last name?",
          name: 'employeeLastName',
          when: answers.whatTask === questionTypes.AddEmployee,
          validate: (response) => validation.required(response),
        },
        {
          type: 'input',
          message: 'What is the role of the employee?',
          name: 'employeeRole',
          when: answers.whatTask === questionTypes.AddRole,
          validate: (response) => validation.required(response),
        },
        {
          type: 'input',
          message: "Who is the employee's manager?",
          name: 'employeeManager',
          when: answers.whatTask === questionTypes.AddRole,
          validate: (response) => validation.required(response),
        },
      ]);
    });
};

module.exports = questions;
