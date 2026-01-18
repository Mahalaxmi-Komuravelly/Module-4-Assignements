import express from "express"
import { TodosRouter } from "./routes/todos.routes.js";
import { loggerMiddleware } from "./middleware/logger.middleware.js";

const app = express();
app.use(express.json());

const PORT = 3000;
app.use(loggerMiddleware)
app.use("/todos",TodosRouter)
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})