import supabase from "../configs/supbase.config.js";
export async function checkDB(){
    const {error} = await supabase.from("users").select("id").limit(1);
    if(error){
        console.log("Connection to supabse failed",error);
        process.exit(1)
    }
    console.log("Supabase connected successfully")
}