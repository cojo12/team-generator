const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function init () {
  function createManager() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'managerName',
        message: 'What is the managers name?'
      },
      {
        type: 'input',
        name: 'managerId',
        message: 'What is the managers ID number?'
      },
      {
        type: 'input',
        name: 'managerEmail',
        message: 'What is the managers email address?'
      },
      {
        type: 'input',
        name: 'managerNumber',
        message: 'What is the managers office number?'
      }
    ]).then((res) => {
      // console.log(responses);
      const manager = new manager(res.managerName, res.managerId, res.managerEmail, res.managerNumber);
      // console.log(manager);
      createTeam();
    })
  }

  function createTeam() {
    inquirer.prompt ([
      {
        type: 'list',
        name: 'memberChoice',
        message: 'What is the position of the next team member?',
        choices: ['Intern', 'Engineer', 'None']
      }
    ]).then((res) => {
      switch (memberChoice) {
        case 'Engineer':
          createEngineer();
        break;
        case 'Intern':
          createIntern();
        break;
        default:
          buildTeam();
          break;
      }
      const team =[];
      const teamMember = res.memberChoice
      team.push(teamMember);
    })
  }

  function createEngineer() {

  }

  function createIntern() {

  }

  function buildTeam() {

  }
  createManager();
  
}

init();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
