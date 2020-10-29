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
        message:"What would you like to do to the company?",
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

}

function updateCompany() {

}

function addCompany() {

}



