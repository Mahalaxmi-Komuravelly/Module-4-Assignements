import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
let supabase;

try {
    supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY
    )
} catch (error) {
   console.log(error) 
}

export default supabase;