
import { appendFile, readFile, unlink, writeFile } from "fs/promises"
import os from "os"
// Part A – OS Module

console.log("Free memory: ",os.freemem());
console.log("Total number of CPU cores: ",os.cpus().length);

// Part B – File System CRUD Operations

async function fileOperations(){
    try {
        await writeFile("data.txt","Hello World\n");
        console.log("data.txt file is created");

        await writeFile("Readme.md","## This is first line in Readme");
        console.log("Readme.md file is created");

        const data = await readFile("data.txt","utf8");
        console.log("Data read from data.txt file is: \n",data);

        await appendFile("data.txt","This is second line");
        console.log("Updated the data.txt file by adding a new line");

        await unlink("Readme.md");
        console.log("Deleted the Readme.md file successfully");

    } catch (error) {
       console.log("File operation failed",error); 
    }
}
fileOperations();