import app from "./app.js"
import { checkDB } from "./utils/checkDB.js";

const PORT = process.env.PORT || 3652;

app.listen(PORT,async () =>{
    await checkDB();
    console.log(`Server running on http://localhost:${PORT}`);
})