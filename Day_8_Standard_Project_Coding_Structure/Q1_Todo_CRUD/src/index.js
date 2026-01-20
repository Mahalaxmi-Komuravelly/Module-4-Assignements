import express from "express"
import { TodosRouter } from "./routes/todos.routes.js";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(loggerMiddleware)
app.use("/todos",TodosRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})