const cTable = require('console.table');
const questions = require('./questions');
//const db = require('./db/connection');

const PORT = process.env.PORT || 3001;
//const app = express();

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

const viewEmployees = () => {
  return db.query(`VIEW * FROM employee`).then((rows) => {
    let employees = rows;
    console.log('\n');
    console.cTable(employees);
  });
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

const init = () => {
  intro();
  questions();
};

init();
