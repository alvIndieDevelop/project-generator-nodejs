#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const shell = __importStar(require("shelljs"));
// utils
const utils_1 = require("./utils");
// read all subfolders from templates
const projectTypeChoices = fs_1.default.readdirSync(path_1.default.join(__dirname, "templates"));
const getProjectName = (type) => {
    const choices = fs_1.default.readdirSync(path_1.default.join(__dirname, `templates/${type}`));
    return choices;
};
const CURR_DIR = process.cwd();
// questions to generate in cli
// const QUESTIONS = [
//   {
//     name: "project-choice",
//     type: "list",
//     message: "What project template would you like to generate?",
//     choices: projectTypeChoices,
//   },
//   {
//     name: "project-name",
//     type: "input",
//     message: "Project name:",
//     validate: validateInput,
//   },
// ];
inquirer_1.default
    .prompt([
    {
        name: "project-type",
        type: "list",
        message: "What project template would you like to generate?",
        choices: projectTypeChoices,
    },
])
    .then((answers) => {
    const projectType = answers["project-type"];
    const projectName = getProjectName(projectType);
    inquirer_1.default
        .prompt([
        {
            name: "project-choice",
            type: "list",
            message: "What project template would you like to generate?",
            choices: projectName,
        },
        {
            name: "project-name",
            type: "input",
            message: "Project name:",
            validate: utils_1.validateInput,
        },
    ])
        .then((answers) => {
        // get the project choice
        const projectChoice = answers["project-choice"];
        // get the project name
        const projectName = answers["project-name"];
        // get the project template path
        const templatePath = path_1.default.join(__dirname, "templates", projectType, projectChoice);
        // get target path
        const targetPath = path_1.default.join(CURR_DIR, projectName);
        // options
        const options = {
            projectName,
            templateName: projectChoice,
            templatePath,
            targetPath,
        };
        // create the project
        if (!createProject(targetPath))
            return;
        // create the directory contents
        createDirectoryContent(templatePath, projectName);
        // post process
        postProcess(options);
    });
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
    filesToCreate.forEach((file) => {
        const originalFilePath = `${templatePath}/${file}`;
        // get stats about current files
        const stats = fs_1.default.statSync(originalFilePath);
        // if is file
        if (stats.isFile()) {
            const contents = fs_1.default.readFileSync(originalFilePath, "utf8");
            // rename fallback for npm ignore
            if (file === ".npmignore")
                file = ".gitignore";
            const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
            fs_1.default.writeFileSync(writePath, contents, "utf8");
        }
        else if (stats.isDirectory()) {
            fs_1.default.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
            // recursive call
            createDirectoryContent(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
        }
    });
};
const postProcess = (options) => {
    const isNode = fs_1.default.existsSync(path_1.default.join(options.targetPath, "package.json"));
    console.log(options.targetPath);
    if (isNode) {
        shell.cd(options.targetPath);
        console.log("Installing dependencies...");
        const result = shell.exec("npm install");
        if (result.code !== 0) {
            console.log("Error installing dependencies");
            return false;
        }
    }
    console.log(`Project ${options.projectName} created successfully.`);
    return true;
};
//# sourceMappingURL=index.js.map