import express from "express"
import fs from "fs"
export const UsersRouter = express.Router();

const readData = () => {
    try {
        const data = fs.readFileSync("./db.json", "utf-8");
        return JSON.parse(data);
    }
    catch (err) {
        console.log("Error while reading the data from db.json file", err);
    }
}

const writeData = (data) => {
    fs.writeFileSync("./db.json", JSON.stringify(data, null, 2))
}

// Get Users
UsersRouter.get("/", (req, res) => {
    const userData = readData();
    if (!userData)
        return res.status(500).json({ message: "Data Unavailable" })
    res.json({ message: "Users List", users: userData.users })
})

// Create Users (POST request)

UsersRouter.post("/add", (req, res) => {
    const userData = readData();
    if (!userData) {
        return res.status(500).json({ message: "Data Unavailable" })
    }
    const { name, email } = req.body || {};
    if (!name || !email) {
        return res.status(400).json({ message: "All fields required" })
    }
    const newUser = {
        id: Date.now(),
        name,
        email
    }
    userData.users.push(newUser);
    writeData(userData);
    res.status(201).json(
        {
            message: "User created",
            users: userData.users
        })
})

// Update User ( PUT )

UsersRouter.put("/update/:userId", (req, res) => {
    const userData = readData();
    if (!userData) {
        return res.status(500).json({ message: "Data Unavailable" })
    }
    const userId = Number(req.params.userId);
    const user = userData.users.find((u) => u.id === userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const { name, email } = req.body || {};
    if (!name || !email) {
        return res.status(400).json({ message: "All fields required" })
    }
    user.name = name;
    user.email = email;
    writeData(userData);
    res.status(200).json(
        {
            message: "User updated",
            users: userData.users
        })
})

// Get request by ID

UsersRouter.get("/:userId", (req, res) => {
    const userData = readData();
    if (!userData) {
        return res.status(500).json({ message: "Data Unavailable" })
    }
    const userId = Number(req.params.userId);
    const user = userData.users.find((u) => u.id === userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json({
        message: "User found",
        user
    })
})

UsersRouter.delete("/delete/:userId", (req, res) => {
    const userData = readData();
    if (!userData) {
        return res.status(500).json({ message: "Data Unavailable" });
    }
    const userId = Number(req.params.userId);
    const originalLength = userData.users.length;
    userData.users = userData.users.filter((user) => user.id !== userId);
    if (originalLength === userData.users.length) {
        return res.status(404).json({ message: "User not found for deletion" })
    }
    writeData(userData);
    res.status(200).json(
        {
            message: "User deleted",
            users: userData.users
        })
})