const connection = require('./connection');

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  getAllDepartments() {
    return this.connection.promise().query('SELECT * FROM department;');
  }

  getAllRoles() {
    return this.connection
      .promise()
      .query(
        'SELECT role.title, role.id AS role_id, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id'
      );
  }

  getAllEmployees() {
    return this.connection
      .promise()
      .query(
        'SELECT employee.id AS id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department_name, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;'
      );
  }

  addDepartment(departmentName) {
    return this.connection
      .promise()
      .query('INSERT INTO department (name) VALUES (?)', departmentName);
  }

  addRole(roleName, roleSalary, departmentId) {
    return this.connection
      .promise()
      .query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)', [
        roleName,
        roleSalary,
        departmentId,
      ]);
  }

  addEmployee(firstName, lastName, roleId, managerId) {
    return this.connection
      .promise()
      .query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)',
        [firstName, lastName, roleId, managerId]
      );
  }

  updateEmployee(employeeId, roleId) {
    return this.connection
      .promise()
      .query('UPDATE employee SET role_id = (?) WHERE (id) = (?)', [
        roleId,
        employeeId,
      ]);
  }
}

module.exports = new DB(connection);
