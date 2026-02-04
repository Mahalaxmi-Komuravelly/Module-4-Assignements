import express from "express";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todos.controller.js";
import {authMiddleware} from "../middleware/auth.middleware.js";
export const TodosRouter = express.Router();

TodosRouter.post("/",authMiddleware,createTodo);
TodosRouter.get("/",authMiddleware,getTodos);
TodosRouter.put("/:id",authMiddleware,updateTodo);
TodosRouter.delete("/:id",authMiddleware,deleteTodo);
