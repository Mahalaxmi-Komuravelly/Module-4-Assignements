import express from "express"
import fs from "fs"
export const OrdersRoutes = express.Router();

export function readData() {
    try {
        const data = fs.readFileSync("./db.json", "utf-8")
        return JSON.parse(data)
    } catch (error) {
        console.log("Error while reading the file", error)
    }
}

export function writeData(data) {
    fs.writeFileSync("./db.json", JSON.stringify(data, null, 2))
}

// create order
