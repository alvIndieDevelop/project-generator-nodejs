#!/usr/bin/env node
import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import * as shell from "shelljs";

// utils
import { validateInput } from "./utils";

interface IOptions {
  projectName: string;
  templateName: string;
  templatePath: string;
  targetPath: string;
}

// read all subfolders from templates
const projectTypeChoices: string[] = fs.readdirSync(
  path.join(__dirname, "templates")
);

const getProjectName = (type: string) => {
  const choices: string[] = fs.readdirSync(
    path.join(__dirname, `templates/${type}`)
  );
  return choices;
};

const CURR_DIR: string = process.cwd();

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

inquirer
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

    inquirer
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
          validate: validateInput,
        },
      ])
      .then((answers) => {
        // get the project choice
        const projectChoice: string = answers["project-choice"];
        // get the project name
        const projectName: string = answers["project-name"];
        // get the project template path
        const templatePath: string = path.join(
          __dirname,
          "templates",
          projectType,
          projectChoice
        );
        // get target path
        const targetPath: string = path.join(CURR_DIR, projectName);

        // options
        const options: IOptions = {
          projectName,
          templateName: projectChoice,
          templatePath,
          targetPath,
        };

        // create the project
        if (!createProject(targetPath)) return;

        // create the directory contents
        createDirectoryContent(templatePath, projectName);

        // post process
        postProcess(options);
      });
  });

// create the folder with name
const createProject = (targetPath: string) => {
  if (fs.existsSync(targetPath)) {
    console.log(`Folder ${targetPath} exists. Delete or use another name.`);
    return false;
  }
  fs.mkdirSync(targetPath);
  return true;
};

// create directory contents
const createDirectoryContent = (
  templatePath: string,
  newProjectPath: string
) => {
  // level one find files
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const originalFilePath = `${templatePath}/${file}`;

    // get stats about current files
    const stats = fs.statSync(originalFilePath);

    // if is file
    if (stats.isFile()) {
      const contents = fs.readFileSync(originalFilePath, "utf8");
      // rename fallback for npm ignore
      if (file === ".npmignore") file = ".gitignore";

      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, "utf8");
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

      // recursive call
      createDirectoryContent(
        `${templatePath}/${file}`,
        `${newProjectPath}/${file}`
      );
    }
  });
};

const postProcess = (options: IOptions): boolean => {
  const isNode = fs.existsSync(path.join(options.targetPath, "package.json"));

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
