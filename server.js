const express = require('express');
const db = require('./db/connection');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const displayJsonAsTable = (t) => {
  const table = cTable.getTable(t);
  console.log(table);
};

db.query('SELECT * FROM department', function (err, results) {
  displayJsonAsTable(results);
});

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const inquirer = require('inquirer');
const cTable = require('console.table');

const questionTypes = {
  ViewDepartments: '= View all departments',
  ViewRoles: '= View all roles',
  ViewAllEmployees: '= View all employees',
  AddDepartment: '+ Add a department',
  AddRole: '+ Add a role',
  AddEmployee: '+ Add an employee',
  UpdateRole: '/ Update an employee role',
};

const intro = () => {
  console.log(`
                              W E L C O M E
                           
                                   to
                                   
                $-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$
                $                                         $
                $     E m p l o y e e   T r a c k e r     $
                $                                         $
                $-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$
                
`);
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

const init = () => {
  intro();
  questions();
};

init();
