# unit12-management-system
The purpose of this project was to use what we have learned in class to update tables in my sql by taking user input from inquirer.  The objective was that the user can create a company and add departments, roles and employees from prompts that were given and then are allowed to view those three categories and update employees as well.  This project made us join tables to ensure that the department id and role id matched in each table of the database.

# Installation
To use please open the integrated terminal and run 'npm i'.  This will install all node packages required for the project, the two packages are 'inquirer' and 'mysql' which can be found in the package.json.

# Usage
It is important to note that for this project when creating the company it must be worked from the bigger pieces to the smaller pieces to work.  By this I mean that a department must be created first in order to create a role, and a role is required to be created to create an employee.