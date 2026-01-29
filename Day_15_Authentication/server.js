import express from "express"
import { checkDB } from "./src/utils/checkDB.js";
import { UserRouter } from "./src/routes/users.route.js";

const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use("/users",UserRouter)
app.listen(PORT,async ()=>{
    await checkDB();
    console.log(`Server running on http://localhost:${PORT}`)
})