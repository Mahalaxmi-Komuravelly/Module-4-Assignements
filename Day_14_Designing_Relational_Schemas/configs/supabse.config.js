import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv"
dotenv.config();
let supabase;
try {
    supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY
    )
} catch (error) {
    console.log("Failed to connect to DB",error)
}


export default supabase;