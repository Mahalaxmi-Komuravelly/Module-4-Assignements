import { readData } from "../routes/users.routes.js";

export const uniqueEmail = (req, res, next) => {
    const { email } = req.body;
    if(!email){
        return res.status(400).json({"message": "Email is required"})
    }
    const data = readData();
    const user = data.users.find((u) => u.email.toLowerCase() === email.toLowerCase())
    if(!user) {
        return next()
    }
    return res.status(409).json({"error": "Email already exists"})
}


