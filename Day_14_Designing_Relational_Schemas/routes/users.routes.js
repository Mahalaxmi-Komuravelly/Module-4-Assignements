import express from "express";
import { addUser, deleteUser } from "../controllers/users.controller.js";
export const UserRouter = express.Router();

UserRouter.post("/signup", addUser );
UserRouter.delete("/delete-user/:userId",deleteUser)