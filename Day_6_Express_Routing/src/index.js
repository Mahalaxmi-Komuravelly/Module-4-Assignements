import express from "express";
import { TodosRouter } from "./routes/todos.routes.js";
import { UsersRouter } from "./routes/users.routes.js";
const app =  express();
app.use(express.json());

const PORT = 3000;

app.use("/todos",TodosRouter);
app.use("/users",UsersRouter);


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})