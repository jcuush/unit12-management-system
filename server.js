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
            "View Departments, roles or employees",
            "Add Departments, roles, or employees",
            "Update Employee"
        ]
    }).then(function(answer) {
        switch (answer.action) {
            case "View Departments, roles or employees":
                viewCompany();
                break;
            
            case "Add Departments, roles, or employees":
                addCompany();
                break;
            case "Update Employee":
                updateEmployee();
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
            case "Exit":
                connection.end();
        }
    })

}

function updateEmployee() {
    let query = `SELECT * FROM employee`
    connection.query(query, function(err, result) {
    // console.log(err, result);


        let employeeArray = [];

        for (let i = 0; i < result.length; i++) {
            employeeArray.push(`${result[i].first_name} ${result[i].last_name}`);
        }
    let query2 =  `SELECT * FROM role`
    connection.query(query2, function(err, result) {
        // console.log(err, result);
    
    
            let roleArray = [];
    
            for (let i = 0; i < result.length; i++) {
                roleArray.push(result[i].title);
            }
    

    inquirer
    .prompt([
    {
        type: "list",
        message:"Which employee do you want to update",
        name: "update",
        choices: employeeArray
    },
    {
        type: "list",
        message: "What is the employee's new role",
        name:"updateRole",
        choices: roleArray
    }

]).then(function(ans){
    console.log(ans);

    let query = `UPDATE employee INNERJOIN role on employee.role_id = role.id SET role_id = ?`
    connection.query(query,[ans.roleArray], function (err,res) {
        if (err) throw err;
        reRun();
    });
});
    });
});
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
        reRun();
    })
    

}

function viewRoles() {
    let query = "SELECT * FROM role";
    connection.query(query, function(err,res) {
        console.log("\n\n");
        console.table(res);  
        reRun();
    })
    
}

function viewEmployees() {
    let query = "SELECT * FROM employee";
    connection.query(query, function(err,res) {
        console.log("\n\n");
        console.table(res);   
        reRun();
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
            reRun();
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
            reRun();
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
            reRun();
        });
    });
    });
    

}

function reRun() {
    inquirer
    .prompt({
        type: "list",
        message: "Would you like to do more with the company?",
        name: "again",
        choices: [
            "yes",
            "no"
        ]
    }).then(function(ans) {
        if(ans.again === "yes"){
            init();
        }
        else if(ans.again === "no"){
            connection.end();
        }
    })
}
