# Understanding Project Management in NodeJS

## Package Managers

A **package manager** is a tool that helps developers install, update, remove, and manage external libraries (also called packages or dependencies) that a project needs.

Instead of writing everything from scratch, developers can reuse existing code written by others. 

**Example:**  
If you want to use a library to handle dates, you don’t need to write it on your own. You can install a ready-made package using a package manager.


### Why do we need package managers in backend development?

In backend development, applications often depend on many libraries such as:
- Web frameworks (Express)
- Database drivers (Mongoose, Sequelize)
- Authentication tools (JWT, bcrypt)

Package managers help by:
- Automatically downloading required libraries
- Keeping track of versions
- Making sure all developers use the same dependencies
- Saving a lot of time and effort


### Problems faced if package managers are not used

If we don’t use package managers:
- Developers would have to manually download and copy libraries
- Version mismatches could break the application
- Setting up the project on a new machine would be difficult
- Collaboration becomes tough

Managing dependencies without a package manager is slow, confusing, and unreliable.


## NPM (Node Package Manager)

**NPM (Node Package Manager)** is the default package manager for Node.js.  
It comes automatically when Node.js is installed.

NPM allows developers to:
- Install third-party libraries
- Manage project dependencies easily

### Why is NPM important for Node.js applications?

NPM is important because:
- Node.js projects heavily rely on external packages
- It ensures consistency across different environments
- It makes project setup quick and repeatable

Without NPM, building modern Node.js applications would be very difficult.

### How NPM helps in managing dependencies

NPM keeps track of dependencies using files like:
- `package.json`
- `package-lock.json`

When you run the following command in Command prompt:

npm install express

NPM will:

- Download Express
- Save it in the node_modules folder
- Record its version in package.json
- Lock exact versions in package-lock.json

This ensures the same versions are installed every time.

## Backend Project Initialization

### What is the command used to initialize a backend (Node.js) project?

The command used is:

npm init

### Explain what npm init and npm init -y do

**npm init**

- It starts an interactive setup
- Asks questions like project name, version, description, author
- Creates a package.json file based on your answers

**npm init -y**

- Skips all questions
- Automatically creates package.json with default values

## Files and Folders Created After Project Initialization

### package.json

- Acts as the heart of a Node.js project
- Stores project information and dependencies

**Why it’s important:**

- Tells NPM what the project needs to run
- Helps others understand and install the project correctly

### node_modules

Contains all installed packages and their dependencies

**Why it’s important:**

- Without this folder, the application cannot run
- It is automatically recreated using npm install

### package-lock.json

Locks exact versions of installed dependencies

**Why it’s important:**
- Ensures the project behaves the same on every machine
- Prevents bugs caused by version differences

### Which files/folders should NOT be pushed to GitHub and why?

**node modules**
- It is very large in size
- It can be regenerated using npm install
- Uploading it wastes storage and time
- This folder is usually added to .gitignore.

### Which files MUST be committed and why?

**package.json**

Tells others which dependencies are used by the project

**package-lock.json**

Ensures everyone installs the exact same versions.
These files are important for collaboration and project consistency.