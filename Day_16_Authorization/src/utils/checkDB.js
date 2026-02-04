import supabase from "../config/supabase.js";
export const checkDB = async () => {
    const {error} = await supabase.from("authusers").select("id").limit(1);
    if(error){
        console.log("Supabase connection failed");
        process.exit(1);
    }
    console.log("Supabase connected successfully");
}