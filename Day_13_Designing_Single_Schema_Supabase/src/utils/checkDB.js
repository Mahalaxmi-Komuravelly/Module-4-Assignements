import supabase from "../configs/supabase.config.js"

export const checkDB = async ()=>{
     const {error} = await supabase.from("userss").select("id").limit(1);
     if(error){
        console.log("Failed to connect Supabase")
        process.exit(1)
     }
     console.log("Supabase connected successfully")
}