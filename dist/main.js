#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// utils
const utils_1 = require("./utils");
// read all subfolders from templates
const CHOICES = fs_1.default.readdirSync(path_1.default.join(__dirname, "templates"));
const CURR_DIR = process.cwd();
// questions to generate in cli
const QUESTIONS = [
    {
        name: "project-choice",
        type: "list",
        message: "What project template would you like to generate?",
        choices: CHOICES,
    },
    {
        name: "project-name",
        type: "input",
        message: "Project name:",
        validate: utils_1.validateInput,
    },
];
// show question to cli
inquirer_1.default.prompt(QUESTIONS).then((answers) => {
    // get the project choice
    const projectChoice = answers["project-choice"];
    // get the project name
    const projectName = answers["project-name"];
    // get the project template path
    const templatePath = path_1.default.join(__dirname, 'templates', projectChoice);
    // get target path
    const targetPath = path_1.default.join(CURR_DIR, projectName);
    // create the project
    if (!createProject(targetPath))
        return;
});
// create the folder with name
const createProject = (targetPath) => {
    if (fs_1.default.existsSync(targetPath)) {
        console.log(`Folder ${targetPath} exists. Delete or use another name.`);
        return false;
    }
    fs_1.default.mkdirSync(targetPath);
    return true;
};
// create directory contents
const createDirectoryContent = (templatePath, newProjectPath) => {
    // level one find files
    const filesToCreate = fs_1.default.readdirSync(templatePath);
    filesToCreate.forEach(file => {
        const originalFilePath = `${templatePath}/${file}`;
        // get stats about current files
        const stats = fs_1.default.statSync(originalFilePath);
        // if is file
        if (stats.isFile()) {
            const contents = fs_1.default.readFileSync(originalFilePath, 'utf8');
            // rename fallback for npm ignore
            if (file === '.npmignore')
                file = '.gitignore';
            const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
            fs_1.default.writeFileSync(writePath, contents, 'utf8');
        }
        else if (stats.isDirectory()) {
            fs_1.default.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
            // recursive call
            createDirectoryContent(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
        }
    });
};
//# sourceMappingURL=main.js.map