INSERT INTO department (name)
VALUES ("Accounting"), ("Administrative"), ("Management"), ("Sales"), ("Warehouse");

INSERT INTO role (title, salary, department_id)
VALUES
("Administrative Assistant", 36000, 2),
("Executive Manager", 100000, 3),
("Sales Manager", 60000, 3),
("Sales Representive", 42000, 4),
("Warehouse Manager", 65000, 3)
;

INSERT INTO `employee_db`.`employee` (`first_name`, `last_name`, `role_id`) VALUES ('David', 'Wallace', '2');
INSERT INTO `employee_db`.`employee` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Darryl', 'Philbin', '5', '1');
INSERT INTO `employee_db`.`employee` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Jim', 'Halbert', '4', '4');
INSERT INTO `employee_db`.`employee` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Michael', 'Scott', '3', '1');
INSERT INTO `employee_db`.`employee` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Pam', 'Beesly', '1', '4');
INSERT INTO `employee_db`.`employee` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Andy', 'Bernard', '4', '4');
INSERT INTO `employee_db`.`employee` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Dwight ', 'Schrute', '4', '4');
