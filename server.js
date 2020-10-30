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

function updateCompany() {

}

function addCompany() {
    inquirer
    .prompt({
        type: "list",
        message:"What would you like to add",
        name: "add",
        choices: [
            "Department",
            "Role",
            "Employee"
        ]

    }).then(function(answer) {
        switch (answer.add) {
            case "Department":
                addDepartment();
                break;
                
            case "Role":
                addRole();
                break;
    
            case "Employee":
                addEmployee();
                break;

        }
    })
};


function viewDepartments() {
    let query = "SELECT * FROM department";
    connection.query(query, function(err,res) {
        console.log("\n\n");
        console.table(res);
    })

}

function viewRoles() {
    let query = "SELECT * FROM role";
    connection.query(query, function(err,res) {
        console.log("\n\n");
        console.table(res);  
    })
}

function viewEmployees() {
    let query = "SELECT * FROM employee";
    connection.query(query, function(err,res) {
        console.log("\n\n");
        console.table(res);   
    })
}

function viewEntireCompany () {
    let query = `SELECT employee.id, first_name, last_name, title, salary, name, manager_id FROM employee JOIN role on role_id = role.id JOIN department ON department_id = department.id`
    connection.query(query, function(err, result) {
        if (err) throw err;
        console.log("\n\n");
        console.table(result);
    })
}

function addDepartment () {
    inquirer.prompt({
        type:"input",
        message:"What is the new department",
        name: "newDepartment"
    }).then(function(res){
        let query = `INSERT INTO department (name) VALUES (?)`
        connection.query(query,[res.newDepartment], function (err,res) {
            console.log(err, res);
        })
    });
    
};

function addRole () {
    let query = `SELECT * FROM department`
    connection.query(query, function(err, result) {
    // console.log(err, result);


        let departmentArray = [];

        for (let i = 0; i < result.length; i++) {
            departmentArray.push(result[i].name);
        }

    inquirer.prompt([
        {
        type:"input",
        message:"What is the new role",
        name: "newRole",
        },

        {
        type:"input",
        message:"What is the new salary",
        name: "newSalary",
        },

        {
        type:"list",
        message:"What is the department of the role",
        choices: departmentArray,
        name: "roleDepartment",
        }

    ]).then(function(ans){
        let departmentID;
        for(let i = 0; i < result.length; i++) {
            if(result[i].name === ans.roleDepartment) {
                departmentID = result[i].id;
            }
        }
        let query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`
        connection.query(query,[ans.newRole, ans.newSalary, departmentID], function (err,res) {
            if (err) throw err;
            
        })
    });
});
    
}

function addEmployee () {
    let query = `SELECT * FROM role`
    connection.query(query, function(err, result) {
    // console.log(err, result);


        let roleArray = [];

        for (let i = 0; i < result.length; i++) {
            roleArray.push(result[i].title);
        }
    inquirer.prompt([
        {
        type:"input",
        message:"What is the new employee's first name?",
        name: "newFirst",
        },

        {
        type:"input",
        message:"What is the new employee's last name?",
        name: "newLast",
        },

        {
        type:"list",
        message:"What is the role of the new employee",
        choices: roleArray,
        name: "employeeRole",
        }

    ]).then(function(ans){
        let roleID;
        for(let i = 0; i < result.length; i++) {
            if(result[i].name === ans.employeeRole) {
                roleID = result[i].id;
            }
        }
        let query = `INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)`
        connection.query(query,[ans.newFirst, ans.newLast, roleID], function (err,res) {
            if (err) throw err;
        });
    });
    });

}
