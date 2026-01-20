
import fs from "fs"
export const readData = () => {
    try {
        const data = fs.readFileSync("./src/db.json","utf-8")
        return JSON.parse(data)
    } catch (error) {
        console.log("Error while reading db.json file",error)
    }
}

export const writeData = (data) => {
    fs.writeFileSync("./src/db.json",JSON.stringify(data,null,2))
}