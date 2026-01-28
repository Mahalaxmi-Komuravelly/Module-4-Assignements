import express from "express"
import {UserRouter} from "./routes/users.routes.js"
import { TodosRouter } from "./routes/todos.routes.js";
import { checkDB } from "./utils/checkDB.js";
const app = express();
const PORT=8080;
app.use(express.json());
app.use("/users",UserRouter);
app.use("/todos",TodosRouter)
app.listen(PORT,async ()=>{
    await checkDB();
    console.log(`Server running on http://localhost:${PORT}`)
})