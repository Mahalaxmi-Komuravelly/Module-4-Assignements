import supabase from "../configs/supabase.config.js"
import bcrypt from "bcrypt"

export const addUser = async (req, res) => {
    try {
        const { name, email, password, age } = req.body;
        const { data: existing, error: userError } = await supabase.from("userss").select().eq("email", email).maybeSingle();
        if (userError) {
            return res.status(500).json({ message: userError.message })
        }
        if (existing) {
            return res.status(409).json({ message: "Email already exists" })
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const { data, error } = await supabase.from("userss").insert([{ name, email, password:hashedPassword, age }]).select().single();
        if (error) {
            return res.status(500).json({ message: error.message })
        }
        res.status(201).json({ message: "User added successfully", user: data })
    } catch (error) {
        console.log(error)
    }
}

export const getUsers = async (req, res) => {
    try {
        const { data, error } = await supabase.from("userss").select();
        if (error) {
            return res.status(500).json({ message: error.message })
        }
        res.status(200).json({ message: "Users data fectched successfully", users: data })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
export const getUserByID = async (req, res) => {
    try {
        const { userId } = req.params;
    const { data, error } = await supabase.from("userss").select().eq("id", userId).maybeSingle();
    if (error) {
        return res.status(500).json({ message: error.message })
    }
    if(!data){
        return res.status(404).json({ message: "User not found" })
    }
    res.status(200).json({ message: "User data fetched successfully", user: data })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params
        const { name, email, password, age, role } = req.body || {}
        const { data: existing, error: userError } = await supabase.from("userss").select().eq("id", userId).maybeSingle();
        if (userError) {
            return res.status(500).json({ message: userError.message })
        }
        if (!existing) {
            return res.status(404).json({ message: "User not found" })
        }
        let hashedPassword;
        if(password){
            hashedPassword = await bcrypt.hash(password,10);
        }
        const { data, error } = await supabase.from("userss").update([{ name, email, password:hashedPassword, age, role }]).eq("id", userId).select().single();
        if (error) {
            return res.status(500).json({ message: error.message })
        }
        res.status(200).json({ message: "User data updated successfully", user: data })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { data, error } = await supabase.from("userss").delete().eq("id", userId).select().maybeSingle()
        if (error) {
            return res.status(500).json({ message: error.message })
        }
        if (!data) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({ message: "User data deleted successfully", user: data })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

