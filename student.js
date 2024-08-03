#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'Chalk';
console.log(chalk.bold.italic.blue("WELCOME TO STUDENT MANAGEMENT SYSTEM PROJECT"));
let students = []; // List to store student information
let condition = true; // Controls whether the loop continues
// Function to display student details
function displayStudentDetails(studentData, additionalInfo = {}) {
    console.log(chalk.bold.italic.red("\n******Student Details******"));
    console.log(chalk.bold.italic.yellow("Student Name:", chalk.bold.italic.blue(studentData.s_name)));
    console.log(chalk.bold.italic.yellow("Student Father's Name:", chalk.bold.italic.blue(studentData.s_fatherName)));
    console.log(chalk.bold.italic.yellow("Student Email:", chalk.bold.italic.blue(studentData.s_email)));
    console.log(chalk.bold.italic.yellow("Student Contact:", chalk.bold.italic.blue(studentData.s_contact)));
    console.log(chalk.bold.italic.yellow("Student Address:", chalk.bold.italic.blue(studentData.s_address)));
    console.log(chalk.bold.italic.yellow("Student Gender:", chalk.bold.italic.blue(studentData.s_gender)));
    console.log(chalk.bold.italic.yellow("Student Qualification:", chalk.bold.italic.blue(studentData.s_qualification)));
    // Display additional information if provided
    if (additionalInfo.marks !== undefined) {
        console.log(chalk.bold.italic.yellow("Obtained Marks:", additionalInfo.marks));
    }
    if (additionalInfo.cgpa !== undefined) {
        console.log(chalk.bold.italic.yellow("Cumulative GPA:", additionalInfo.cgpa));
    }
    console.log(chalk.bold.italic.yellow("Generated Random ID:", studentData.randomID));
}
async function studentManagement() {
    while (condition) {
        // Collect student data
        let studentData = await inquirer.prompt([
            { name: "s_name", type: "input", message: "Enter your name" },
            { name: "s_fatherName", type: "input", message: "Enter your father's name" },
            { name: "s_email", type: "input", message: "Enter your email" },
            { name: "s_contact", type: "input", message: "Enter your mobile number" },
            { name: "s_address", type: "input", message: "Enter your residential area" },
            {
                name: "s_gender",
                type: "list",
                message: "Select your gender",
                choices: ["Male", "Female", "Prefer not to say"],
            },
            {
                name: "s_qualification",
                type: "list",
                message: "Select your qualification",
                choices: ["Matriculation", "Intermediate", "Graduation", "Masters"],
            },
        ]);
        // Assign a random ID to the student
        studentData.randomID = Math.floor(Math.random() * 5000) + 1000;
        // Handle qualification-based operations
        switch (studentData.s_qualification) {
            case "Matriculation":
                let totalMarks = 850;
                let marks = await inquirer.prompt({
                    name: "obtainedMarks",
                    type: "number",
                    message: "Enter your obtained marks: ",
                });
                let percentage = (marks.obtainedMarks / totalMarks) * 100;
                if (percentage >= 50) {
                    displayStudentDetails(studentData, { marks: marks.obtainedMarks, percentage });
                    console.log("Your admission is confirmed.");
                    students.push(studentData); // Add to students list
                }
                else {
                    console.log("Your percentage is below the requirement.");
                    console.log("Exiting the program...");
                    process.exit(0); // Exit if not qualified
                }
                break;
            case "Intermediate":
                let interTotalMarks = 1100;
                let interMarks = await inquirer.prompt({
                    name: "obtainedMarks",
                    type: "number",
                    message: "Enter your obtained marks for Intermediate: ",
                });
                let interPercentage = (interMarks.obtainedMarks / interTotalMarks) * 100;
                displayStudentDetails(studentData, { marks: interMarks.obtainedMarks, percentage: interPercentage });
                students.push(studentData);
                console.log("Your Intermediate percentage is:", interPercentage);
                break;
            case "Graduation":
                let gpaInputs = await inquirer.prompt([
                    { name: "semester1", type: "number", message: "Enter your first semester GPA: " },
                    { name: "semester2", type: "number", message: "Enter your second semester GPA: " },
                    { name: "semester3", type: "number", message: "Enter your third semester GPA: " },
                    { name: "semester4", type: "number", message: "Enter your fourth semester GPA: " },
                    { name: "semester5", type: "number", message: "Enter your fifth semester GPA: " },
                    { name: "semester6", type: "number", message: "Enter your sixth semester GPA: " },
                    { name: "semester7", type: "number", message: "Enter your seventh semester GPA: " },
                    { name: "semester8", type: "number", message: "Enter your eighth semester GPA: " },
                ]);
                let totalGPA = gpaInputs.semester1 + gpaInputs.semester2 + gpaInputs.semester3 + gpaInputs.semester4 + gpaInputs.semester5 + gpaInputs.semester6 + gpaInputs.semester7 + gpaInputs.semester8;
                let cgpa = totalGPA / 8;
                displayStudentDetails(studentData, { cgpa });
                students.push(studentData);
                break;
            case "Masters":
                let m_courses = await inquirer.prompt([
                    { name: "semester1", type: "number", message: "Enter your first semester GPA: " },
                    { name: "semester2", type: "number", message: "Enter your second semester GPA: " },
                    { name: "semester3", type: "number", message: "Enter your third semester GPA: " },
                    { name: "semester4", type: "number", message: "Enter your fourth semester GPA: " },
                ]);
                let total_GPA = m_courses.semester1 + m_courses.semester2 + m_courses.semester3 + m_courses.semester4;
                let m_cgpa = total_GPA / 4;
                displayStudentDetails(studentData, { cgpa: m_cgpa });
                students.push(studentData);
                break;
        }
        // Ask if the user wants to continue or exit
        let continuePrompt = await inquirer.prompt([
            { name: "continue", type: "confirm", message: "Do you want to add another student?" },
        ]);
        condition = continuePrompt.continue; // Update the loop condition based on user input
    }
    console.log("Exiting the program. Goodbye!");
    process.exit(0);
}
// Start the student management function
studentManagement();
