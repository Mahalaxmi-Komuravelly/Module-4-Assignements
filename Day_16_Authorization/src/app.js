import express from "express";
import { AuthRouter } from "./routes/auth.routes.js";
import { TodosRouter } from "./routes/todo.routes.js";
const app = express();

app.use(express.json());

app.use("/auth",AuthRouter);
app.use("/todos",TodosRouter);

export default app;