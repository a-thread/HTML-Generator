// module requirements
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// js file requirements
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const questions = require("./lib/questions");
const render = require("./lib/htmlRenderer");

// output variables
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// employees array to hold team members as we build them
const employees = [];

// empty employee object to hold answers
let employee = {};

// function driving the UX
const startPromps = () => {
    // prompting user to choose: "manager", "engineer", "intern", or "done!"
    return inquirer.prompt(questions.startQ).then((empRole) => {
        employee['role'] = empRole.role;
        // if they choose "Done!"
        if (empRole.role === "Done!") {
            // their team page will be rendered
            const teamPage = render(employees);
            // and written to the output folder
            fs.writeFile(outputPath, teamPage, (err) => {
                if (err) throw err;
                // sign off message
                console.log("Successfully generated your Team Page Html! You will find it in the output folder under 'team.html'.");
            })
        // otherwise...
        } else {
            // they will be prompted by the general employee questions
            return inquirer.prompt(questions.employeeQ).then((empAns) => {
                employee['name'] = empAns.name;
                employee['id'] = empAns.id;
                employee['email'] = empAns.email;
                // with add-on questions for each employee role
                if (empRole.role === "Manager") {
                    return inquirer.prompt(questions.managerQ).then((mgrAns) => {
                        employee['officeNumber'] = mgrAns.officeNumber;
                        // creating a new Manager from employee information
                        employees.push(new Manager(employee.name, employee.id, employee.email, employee.officeNumber));
                        startPromps();
                    })
                } if (empRole.role === "Engineer") {
                    return inquirer.prompt(questions.engineerQ).then((engAns) => {
                        employee['github'] = engAns.github;
                        // creating a new Engineer from employee information
                        employees.push(new Engineer(employee.name, employee.id, employee.email, employee.github));
                        startPromps();
                    })
                } if (empRole.role === "Intern") {
                    return inquirer.prompt(questions.internQ).then((intAns) => {
                        employee['school'] = intAns.school;
                        // creating a new Intern from employee information
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
    console.log("Hi there! Welcome to Aiden's HTML Generator. Please follow the prompts to generate an html file displaying your team!")
    try {
        // starting the prompts!
        await startPromps();

    } catch (err) {
        // catching any errors
        console.log(err);
    }
};

init();