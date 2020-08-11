const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamArray = [];

// Manager: 
const managerQuestions = [

    {
        type: 'input',
        name: 'managerName',
        message: 'Please enter the name of the manager of this team, or your name if you are the manager of this team. '
    },

    {
        type: 'input',
        name: 'managerID',
        message: 'What is this managers ID number, enter your ID number if you are the manager of this team'
    },

    {
        type: 'input',
        name: 'managerEmail',
        message: 'What is this managers Email address, enter your email address if you are the manager of this team'
    },

    {
        type: 'input',
        name: 'office',
        message: 'What is this managers office number? if you are the manager of this team, enter your office number'
    },
]

//Engineer: 
const engineerQuestions = [

    {
        type: 'input',
        name: 'engineerName',
        message: 'Enter the name of this engineer'
    },

    {
        type: 'input',
        name: 'engineerID',
        message: 'Enter the ID number for this engineer'
    },

    {
        type: 'input',
        name: 'engineerEmail',
        message: 'Enter the email address for this engineer'
    },

    {
        type: 'input',
        name: 'github',
        message: 'Enter this engineers GitHub user name'
    },
]

//Intern:
const internQuestions = [

    {
        type: 'input',
        name: 'internName',
        message: 'Enter the name of this intern'
    },

    {
        type: 'input',
        name: 'internID',
        message: 'Enter the ID number for this intern',
    },

    {
        type: 'input',
        name: 'internEmail',
        message: 'Enter the email address for this intern'
    },

    {
        type: 'input',
        name: 'school',
        message: 'What school does this intern attend, if this intern is not currently attending a school enter "N/A" ',
    },
]

const anotherOne = [
    {
        type: 'list',
        name: 'nextEmployee',
        message: 'Select the type of team member you would like to add next, if you are done select "Done" to generate your team ',
        choices: ['Engineer', 'Intern', 'Done']
    }
]

function init() {
        managerPrompt();
}


function next() {
    inquirer.prompt(anotherOne).then((response) => {
        
        console.log(response);
        switch (response.nextEmployee) {
            case 'Engineer':
                engineerPrompt();
                break;
            case 'Intern':
                internPrompt();
                break;
            case 'Done':
                console.log('Creating your team!')
                makeTeam();
        }
    })
}

function managerPrompt() {
    inquirer.prompt(managerQuestions).then((response) => {

        let name = response.managerName;
        let id = response.managerID;
        let email = response.managerEmail;
        let office = response.office;

        const manager = new Manager(name, id, email, office);

        teamArray.push(manager);
        
        console.log(teamArray);

        next();
    })
}

function engineerPrompt() {
    inquirer.prompt(engineerQuestions).then((response) => {

        let name = response. engineerName;
        let id = response.engineerID;
        let email = response.engineerEmail;
        let github = response.github;

        const engineer = new Engineer (name, id, email, github);

        teamArray.push(engineer);
        console.log(teamArray);

        next();
    })
}

function internPrompt() {
    inquirer.prompt(internQuestions).then((response) => {

        let name = response. internName;
        let id = response.internID;
        let email = response.internEmail;
        let school = response.school;

        const intern = new Intern (name, id, email, school);

        teamArray.push(intern);
        console.log(teamArray);

        next();
    })
}

function makeTeam() {
fs.writeFile(outputPath, render(teamArray), function(err) {
if (err) { 
    return console.log(err)
}
})

}

init()