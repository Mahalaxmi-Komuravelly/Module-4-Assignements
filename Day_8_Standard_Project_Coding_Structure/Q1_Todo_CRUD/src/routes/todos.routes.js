import express from "express"
import { getTodos, createTodos, getTodoByID, updateTodoByID, deleteTodo } from "../controllers/todos.controller.js";
import { limiter } from "../middlewares/rateLimiter.middleware.js";
import {validateTodo} from "../middlewares/validateTodo.middleware.js"
export const TodosRouter = express.Router();

TodosRouter.get("/",limiter,getTodos);

TodosRouter.post("/add",validateTodo,createTodos);

TodosRouter.get("/:todoId",getTodoByID)

TodosRouter.put("/update/:todoId",updateTodoByID)

TodosRouter.delete("/delete/:todoId",deleteTodo)