# Employee-Tracker

Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are called **content management systems (CMS)**. This is a command-line application to manage a company's employee database, using Node.js, Inquirer, and MySQL.

## User Story

```md
AS A business owner

I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Satisfied Acceptance Criteria

```md
GIVEN a command-line application that accepts user input

WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids

WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database

WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

## Satisfied Technical Acceptance Criteria

- Uses the [Inquirer package](https://www.npmjs.com/package/inquirer).

- Uses the [MySQL2 package](https://www.npmjs.com/package/mysql2) to connect to a MySQL database.

- Uses the [console.table package](https://www.npmjs.com/package/console.table) to print MySQL rows to the console.

- Follows the 'Database Schema' outlined below.

## Database Schema:

Schema contains the following three tables:

- `department`

  - `id`: `INT PRIMARY KEY`

  - `name`: `VARCHAR(30)` to hold department name

- `role`

  - `id`: `INT PRIMARY KEY`

  - `title`: `VARCHAR(30)` to hold role title

  - `salary`: `DECIMAL` to hold role salary

  - `department_id`: `INT` to hold reference to department role belongs to

- `employee`

  - `id`: `INT PRIMARY KEY`

  - `first_name`: `VARCHAR(30)` to hold employee first name

  - `last_name`: `VARCHAR(30)` to hold employee last name

  - `role_id`: `INT` to hold reference to employee role

  - `manager_id`: `INT` to hold reference to another employee that is the manager of the current employee (`null` if the employee has no manager)

## Create Database & Seed Tables

### Load 'the office' characters

Start a new Terminal from the project's root folder & run the following:

```
$ mysql -u root -h localhost -p
mysql> source db/schema.sql
mysql> source db/seeds.sql
```

![the office, season](./images/officeCharacters.png)

## Video Setting up & Running Application

The following video shows the application database being created, seeded, then application invoked from the command line:

[![A video thumbnail shows the command-line employee management application with a play button overlaying the view.](./images/screenshot.png)](https://watch.screencastify.com/v/GV81cwvNd59shHGbHw7P)

## Bonus

Additional functionality:

- View the total utilized budget of a department&mdash;in other words, the combined salaries of all employees in that department.
