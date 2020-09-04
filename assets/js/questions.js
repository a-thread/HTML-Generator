const startQ = {
        type: "list",
        name: "role",
        message: "Which type of employee would you like to build a profile for?",
        choices: [
            "Manager",
            "Engineer",
            "Intern",
            "Done!"
        ],
        default: "Manager"
    };

const employeeQ = [
    { // user full name
        type: "input",
        name: "name",
        message: "What is the employee's name?",
        default: "Firstname Lastname"
    },
    { // id
        type: "input",
        name: "id",
        message: "Id?",
        default: "1"
    },
    { // email
        type: "input",
        name: "email",
        message: "Email address?",
        default: "email@address.com"
    }
];
const managerQ = { 
    // office number
    type: "input",
    name: "officeNumber",
    message: "Office number?",
    default: "1"
};

const engineerQ = {
    // github
        type: "input",
        name: "github",
        message: "Github username?",
        default: "user-name"
    };

const internQ = {
    // school
        type: "input",
        name: "school",
        message: "The university or school where they are studying?",
        default: "UNH"
    };

module.exports = { startQ, employeeQ, managerQ, engineerQ, internQ };