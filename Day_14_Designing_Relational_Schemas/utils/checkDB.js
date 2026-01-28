import supabase from "../configs/supabse.config.js"

export const checkDB = async ()=>{
    const {error} = await supabase.from("users").select().limit(1);
    if(error){
        console.error("Supabase connection failed",error.message);
        process.exit(1);
    }
    console.log("Supabase connected successfully")
}