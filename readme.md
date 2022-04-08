# Project generator nodeJS cli

This project have many templates to make the development a little more fast, and stop re-write and configuring.

## Getting Started

### Prerequisites

Requirements for the software and other tools to build, test and push

- NodeJS
- Git

### Installing by npm

    npm i -g @alvindiedevelop/project-generator-nodejs

execute

    pgenerator

Select what type of project you want, and it will create the project.

- **create-react-app-redux-mui-react-router-i18n**: create a builerplate bootrstraped with create-react-app but have:
  - [Redux (@reduxjs/toolkit)](https://redux-toolkit.js.org/)
  - i18n for Internationalization
    - [i18next](https://www.i18next.com/)
    - [react-i18next](https://react.i18next.com/) - Wrapper for React.
    - [i18next-browser-languagedetector](https://www.npmjs.com/package/i18next-browser-languagedetector) - for lenguage detector.
  - [react-router-dom](https://reactrouterdotcom.fly.dev/docs/en/v6/getting-started/installation)
  - [Material-UI/MUI](https://mui.com/)

### Build from source code

Clone the repository

    git clone https://github.com/alvIndieDevelop/project-generator-nodejs.git

Run build

    npm run build

To use the cli anywhere need to register "pgenerator" as a comand line interface.

    npm link

To remove/uninstall

    npm -g uninstall pgenerator

## Built With

- Typescript
- Node.js
- [inquirer.js](https://www.npmjs.com/package/inquirer) - A collection of common interactive command line user interfaces.
- [shell.js](https://www.npmjs.com/package/shelljs) - Unix shell commands for Node.js

## Authors

- **Alvaro Martin Caballero** -
  [alvindiedevelop](https://github.com/alvindiedevelop)

# TODO

- [x] make a npm package.
- [ ] make a better description.
- [ ] add more templates.
  - [ ] express.js
  - [ ] express.js with typescript
  - [ ] More reactjs (have multiple selection of react projects)
