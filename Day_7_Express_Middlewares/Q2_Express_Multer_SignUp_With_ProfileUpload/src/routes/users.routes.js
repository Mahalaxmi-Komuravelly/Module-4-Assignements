import express from "express"
import fs from "fs"
import cloudinary from "../config/cloudinary.config.js"
import {upload} from "../middleware/upload.middleware.js"
import {uniqueEmail} from "../middleware/uniqueEmail.middleware.js"
export const UserSignupRouter = express.Router();

export function readData(){
    const data = fs.readFileSync("./src/db.json","utf-8");
    return JSON.parse(data)
}

export function writeData(data){
    fs.writeFileSync("./src/db.json",JSON.stringify(data,null,2))
}

UserSignupRouter.post("/signup", upload.single("profilePic"),uniqueEmail, async (req, res) => {
    try {
        const data = readData()
        const { name, email, password } = req.body || {};
        if (!name || !email || !password || !req.file) {
            return res.status(400).json({ message: "All fields required" })
        }
          console.log("Uploading file to Cloudinary:", req.file.originalname);
        if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
            return res.status(400).json({ message: "All fields should be of string type" })
        }
        const result = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
            {folder:"profilePictures"}
        );
        const cloudinary_image_url = result.secure_url;
        const newUser = {
            id:Date.now(),
            name,
            email,
            password,
            profilePic:cloudinary_image_url
        }
        data.users.push(newUser);
        writeData(data)
        res.status(201).json({
            "message": "User registered successfully",
            "user":newUser
        })

    } catch (error) {
        res.status(500).json({error:"Signup failed",details:error.message})
    }
})