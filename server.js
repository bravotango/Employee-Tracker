const inquirer = require('inquirer');

const questions = () => {
  inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'whatTask',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
      ],
    },
  ]);
};

const init = () => {
  questions();
};

init();
