import express from "express";
import { addTodo,getTodosByUserID, updateTodo, deleteTodo } from "../controllers/todos.controller.js";

export const TodosRouter = express.Router();

TodosRouter.post("/add-todo",addTodo);
TodosRouter.get("/get-my-todo/:userId",getTodosByUserID);
TodosRouter.put("/update-todo/:todoId",updateTodo);
TodosRouter.delete("/delete-todo/:todoId",deleteTodo)
