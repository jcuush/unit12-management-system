var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Hotchkiss92",
  database: "company_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Welcome");
  init();
});

function init() {
    inquirer.prompt({
        type:"list",
        message:"What would you like to do with company?",
        name: "action",
        choices: [
            "View",
            "Update",
            "Add"
        ]
    }).then(function(answer) {
        switch (answer.action) {
            case "View":
                viewCompany();
                break;
            
            case "Update":
                updateCompany();
                break;

            case "Add":
                addCompany();
                break;
        }
    })
}

function viewCompany(){
    inquirer.prompt({
        type:"list",
        message: "What would you like to view?",
        name: "view",
        choices: [
            "Departments",
            "Roles",
            "Employees",
            "Entire Company"
        ]
    }).then(function(answer) {
        switch (answer.view) {
            case "Departments":
                viewDepartments();
                break;
                
            case "Roles":
                viewRoles();
                break;
    
            case "Employees":
                viewEmployees();
                break;
            
            case "Entire Company":
                viewEntireCompany();
                break;
        }
    })

}

// function updateCompany() {

// }

// function addCompany() {

// }

function viewDepartments() {
    let query = "SELECT * FROM department";
    connection.query(query, function(err,res) {
        console.log("success");
        // console.table(res);
    })

}

function viewRoles() {
    let query = "SELECT * FROM role";
    connection.query(query, function(err,res) {
        console.log("success");
        // console.table(res);
        
    })
}

function viewEmployees() {
    let query = "SELECT * FROM employee";
    connection.query(query, function(err,res) {
        console.log("success");
        // console.table(res);
    })
}

function viewEntireCompany () {
    let query = `SELECT employee.id, first_name, last_name, title, salary, name, manager_id 
    FROM employee 
    JOIN role 
    ON role_id = role.id 
    JOIN department 
    ON department_id = department.id`;
    connection.query(query, function(err,res) {
        if (err) throw err;
        console.log("\n\n");
        console.log("success");
        // console.table(res);
    })
}
