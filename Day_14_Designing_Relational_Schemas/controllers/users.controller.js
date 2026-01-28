import supabase from "../configs/supabse.config.js";
export const addUser = async (req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({message:"Name, Email and Password are required"})
    }
    const {data:existing,error:userError} = await supabase.from("users").select().eq("email",email).maybeSingle();
    if(userError){
        return res.status(500).json({message:userError.message})
    }
    if(existing){
        return res.status(409).json({message:"Email already exist"})
    }
    const {data,error} = await supabase.from("users").insert([{name,email,password}]).select().single();
    if(error){
        return res.status(500).json({message:error.message})
    }
     res.status(201).json({message:"User added successfully",user:data})
}

export const deleteUser = async (req,res)=>{
    const {userId} = req.params;
    const {data,error} = await supabase.from("users").delete().eq("id",userId).select().maybeSingle();
    if(error){
        return res.status(500).json({message:error.message})
    }
    if(!data) {
        return res.status(404).json({message:"User not found"})
    }
    res.status(200).json({message:"User deleted successfully",user:data})
}