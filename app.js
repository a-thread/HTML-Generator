const Manager = require("./utils/lib/Manager");
const Engineer = require("./utils/lib/Engineer");
const Intern = require("./utils/lib/Intern");
const questions = require("./utils/lib/questions");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./utils/lib/htmlRenderer");

// function prompting user to answer questions in array
const employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
let employee = {};

const startPromps = () => {
    return inquirer.prompt(questions.startQ).then((empRole) => {
        employee['role'] = empRole.role;
        if (empRole.role === "Done!") {
            const teamPage = render(employees);
            fs.writeFile(outputPath, teamPage, (err) => {
                if (err) throw err;
                console.log("Successfully generated your Team Page Html! You will find it in the output folder under 'team.html'.");
            })
        } else {
            return inquirer.prompt(questions.employeeQ).then((empAns) => {
                employee['name'] = empAns.name;
                employee['id'] = empAns.id;
                employee['email'] = empAns.email;
                if (empRole.role === "Manager") {
                    return inquirer.prompt(questions.managerQ).then((mgrAns) => {
                        employee['officeNumber'] = mgrAns.officeNumber;
                        employees.push(new Manager(employee.name, employee.id, employee.email, employee.officeNumber));
                        startPromps();
                    })
                } if (empRole.role === "Engineer") {
                    return inquirer.prompt(questions.engineerQ).then((engAns) => {
                        employee['github'] = engAns.github;
                        employees.push(new Engineer(employee.name, employee.id, employee.email, employee.github));
                        startPromps();
                    })
                } if (empRole.role === "Intern") {
                    return inquirer.prompt(questions.internQ).then((intAns) => {
                        employee['school'] = intAns.school;
                        employees.push(new Intern(employee.name, employee.id, employee.email, employee.school));
                        startPromps();
                    })
                }
            })
        }
    })
};

async function init() {
    // welcoming user
    console.log("Hi there! Welcome to Aiden's Team Page Generator. Please follow the prompts to generate an html file displaying your team!")
    try {
        await startPromps();

    } catch (err) {
        console.log(err);
    }
};

init();
