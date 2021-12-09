const inquirer = require('inquirer');
require('console.table');
const db = require('../db');

const viewAllDepartments = async () => {
  const [departments] = await db.getAllDepartments();
  console.table(departments);
  questions();
};

const viewAllEmployees = async () => {
  const [employees] = await db.getAllEmployees();
  console.table(employees);
  questions();
};

const viewAllRoles = async () => {
  const [roles] = await db.getAllRoles();
  console.table(roles);
  questions();
};

const viewDepartmentUtilizedBudgets = async () => {
  const [budgets] = await db.getDepartmentUtilizedBudgets();
  console.table(budgets);
  questions();
};

const addDepartment = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      message: 'What is the name of the department?',
      name: 'departmentName',
      validate: (response) => validation.required(response),
    },
  ]);
  await db.addDepartment(answer.departmentName);
  const [roles] = await db.getAllDepartments();
  console.table(roles);
  questions();
};

const addRole = async () => {
  const [departments] = await db.getAllDepartments();
  const departmentChoices = departments.map((department) => {
    return { name: department.name, value: department.id };
  });
  const answers = await inquirer.prompt([
    {
      type: 'input',
      message: 'What is the name of the role?',
      name: 'roleName',
      validate: (response) => validation.required(response),
    },
    {
      type: 'input',
      message: 'What is the salary of the role? $',
      name: 'roleSalary',
      validate: (response) => validation.required(response),
    },
    {
      type: 'list',
      message: 'Which department does the role belong to?',
      name: 'departmentId',
      choices: departmentChoices,
    },
  ]);

  await db.addRole(
    answers.roleName,
    parseInt(answers.roleSalary),
    answers.departmentId
  );
  const [updatedRoles] = await db.getAllRoles();
  console.table(updatedRoles);
  questions();
};

const addEmployee = async () => {
  const [employees] = await db.getAllEmployees();
  let employeeChoices = await employees.map((employee) => {
    return {
      name: [employee.first_name, employee.last_name].join(' '),
      value: employee.id,
    };
  });
  employeeChoices.push({ name: 'No manager', value: null });

  const [roles] = await db.getAllRoles();
  const roleChoices = await roles.map((role) => {
    return { name: role.title, value: role.role_id };
  });

  const answers = await inquirer.prompt([
    {
      type: 'input',
      message: "What is the employee's first name?",
      name: 'firstName',
      validate: (response) => validation.required(response),
    },
    {
      type: 'input',
      message: "What is the employee's last name?",
      name: 'lastName',
      validate: (response) => validation.required(response),
    },
    {
      type: 'list',
      message: 'What is the role of the employee?',
      name: 'roleId',
      choices: roleChoices,
    },
    {
      type: 'list',
      message: "Who is the employee's manager?",
      name: 'managerId',
      choices: employeeChoices,
    },
  ]);

  await db.addEmployee(
    answers.firstName,
    answers.lastName,
    answers.roleId,
    answers.managerId
  );

  const [updatedEmployees] = await db.getAllEmployees();
  console.table(updatedEmployees);
  questions();
};

const updateEmployee = async () => {
  const [employees] = await db.getAllEmployees();
  let employeeChoices = await employees.map((employee) => {
    return {
      name: [employee.first_name, employee.last_name].join(' '),
      value: employee.id,
    };
  });

  const [roles] = await db.getAllRoles();
  const roleChoices = await roles.map((role) => {
    return { name: role.title, value: role.role_id };
  });

  const answers = await inquirer.prompt([
    {
      type: 'list',
      message: 'What employee are we updating?',
      name: 'employeeId',
      choices: employeeChoices,
    },
    {
      type: 'list',
      message: "What is the employee's new Role?",
      name: 'newRoleId',
      choices: roleChoices,
    },
  ]);

  await db.updateEmployee(answers.employeeId, answers.newRoleId);
  const [updatedEmployees] = await db.getAllEmployees();
  console.table(updatedEmployees);
  questions();
};

const questionTypes = {
  ViewAllDepartments: '= View all departments',
  ViewAllRoles: '= View all roles',
  ViewAllEmployees: '= View all employees',
  ViewDepartmentUtilizedBudgets: '= View department utilized budgets',
  AddDepartment: '+ Add a department',
  AddRole: '+ Add a role',
  AddEmployee: '+ Add an employee',
  UpdateRole: '/ Update an employee role',
  Exit: 'Exit Program',
};

const validation = {
  required: (response) => {
    return response ? true : console.error('Required answer. Try again...');
  },
};

let currentTask;
const questions = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'whatTask',
        choices: [
          questionTypes.ViewAllDepartments,
          questionTypes.ViewAllRoles,
          questionTypes.ViewAllEmployees,
          questionTypes.ViewDepartmentUtilizedBudgets,
          questionTypes.AddDepartment,
          questionTypes.AddRole,
          questionTypes.AddEmployee,
          questionTypes.UpdateRole,
          questionTypes.Exit,
        ],
      },
    ])
    .then((answers) => {
      currentTask = answers.whatTask;
      switch (currentTask) {
        case questionTypes.ViewAllDepartments: {
          viewAllDepartments();
          break;
        }
        case questionTypes.ViewAllRoles:
          viewAllRoles();
          break;

        case questionTypes.ViewAllEmployees:
          viewAllEmployees();
          break;

        case questionTypes.ViewDepartmentUtilizedBudgets:
          viewDepartmentUtilizedBudgets();
          break;

        case questionTypes.AddDepartment:
          addDepartment();
          break;

        case questionTypes.AddRole:
          addRole();
          break;

        case questionTypes.AddEmployee:
          addEmployee();
          break;

        case questionTypes.UpdateRole:
          updateEmployee();
          break;

        case questionTypes.Exit:
          process.exit();
      }
    });
};

module.exports = questions;
