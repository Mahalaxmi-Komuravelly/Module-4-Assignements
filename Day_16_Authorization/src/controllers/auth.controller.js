import supabase from "../config/supabase.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
export const signup = async (req,res) =>{
    try {
        const {name,email,password} = req.body || {};
    if(!name || !email || !password){
        return res.status(400).json({message:"All fields are required"})
    }
    const {data:existing ,error: userError} = await supabase.from("authusers").select().eq("email",email).maybeSingle();
    if(userError){
        return res.status(500).json({message:userError.message});
    }
    if(existing){
        return res.status(409).json({message:"User already exists"});
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const {data,error} = await supabase.from("authusers").insert([{name,email,password:hashedPassword}]).select().single();
    if(error){
        return res.status(500).json({message:error.message});
    }
    res.status(201).json({message:"Signup successful",user:{id:data.id,name,email}})
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const login = async (req,res) =>{
    try {
        const {email, password} = req.body || {};
    if(!email || !password){
        return res.status(400).json({message:"Email and password are required"})
    }
    const {data:user ,error: userError} = await supabase.from("authusers").select().eq("email",email).maybeSingle();
    if(userError){
        return res.status(500).json({message:userError.message});
    }
    if(!user){
        return res.status(404).json({message:"User not found"});
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"});
    }
    const token = jwt.sign(
        {"userId":user.id,"email":user.email},
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
    )
    res.status(200).json({message:"Login successful",
        userId:user.id,
        email,
        token})
    } catch (error) {
        return res.status(500).json({message:error.message}); 
    }
}