import supabase from "../configs/supbase.config.js"
import bcrypt from "bcrypt"

export const addUser = async (req, res) => {
    try {
        const { name, email, age, location, password } = req.body || {}
        if (!name || !email || age === undefined || !location || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const { data: existing, error: userError } = await supabase.from("users").select().eq("email", email).maybeSingle();
        if (userError) {
            return res.status(500).json({ message: userError.message })
        }
        if (existing) {
            return res.status(409).json({ message: "Email already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const { data, error } = await supabase.from("users").insert([{ name, email, age, location, password: hashedPassword }]).select().single();
        if (error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(201).json({ "message": "User registered successfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const myProfile = async (req, res) => {
    try {
        const { name } = req.query;
        if(!name){
            return res.status(400).json({message:"Name query is required"})
        }
        const { data, error } = await supabase.from("users").select("id,name,email,age,location").eq("name", name).maybeSingle();
        if (error) {
            return res.status(500).json({ message: error.message })
        }
        if(!data){
            return res.status(404).json({message:"User not found"})
        }
         res.status(200).json({ message: "User found",user:data})

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}