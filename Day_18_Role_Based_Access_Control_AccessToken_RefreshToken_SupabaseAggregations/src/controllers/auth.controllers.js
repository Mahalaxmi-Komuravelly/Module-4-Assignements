import supabase from "../configs/supabase.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body || {}
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required" })
        }
        if (role && !["admin", "user", "manager"].includes(role)) {
            return res.status(400).json({ message: "Role must be admin,user or manager" });
        }
        const { data: existing, error: userError } = await supabase.from("users").select().eq("email", email).maybeSingle();
        if (userError) {
            return res.status(500).json({ message: userError.message });
        }
        if (existing) {
            return res.status(409).json({ message: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            name,
            email,
            password: hashedPassword
        }
        if (role) user.role = role;

        const { data, error } = await supabase.from("users").insert(user).select("name,email,role");
        if (error) {
            return res.status(500).json({ message: error.message });
        }
        res.status(201).json({
            message: "Signup successful",
            id: data.id,
            data
        });
    } catch (error) {
        return res.status(500).json({ message: "Error occured while signup", error: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body || {};
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" })
        }
        const { data: user, error: userError } = await supabase.from("users").select().eq("email", email).maybeSingle();
        if (userError) {
            return res.status(500).json({ message: userError.message });
        }
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        res.status(200).json({
            message: "Login successful",
            id: user.id,
            email: user.email,
            role: user.role,
            accessToken,
            refreshToken
        });
    } catch (error) {
        return res.status(500).json({ message: "Error occured while login", error: error.message });
    }

}

export const refreshToken = (req,res) => {
    try {
        const {refreshToken} = req.body || {};
    if(!refreshToken){
        return res.status(401).json({message:"Refresh Token is missing"})
    }
    const decoded = jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET);
    const newAccessToken = generateAccessToken({id:decoded.id,role:decoded.role});
    res.json({
        accessToken:newAccessToken
    })
    } catch (error) {
       res.status(403).json({message:"Invalid refresh token"})
    }
}
