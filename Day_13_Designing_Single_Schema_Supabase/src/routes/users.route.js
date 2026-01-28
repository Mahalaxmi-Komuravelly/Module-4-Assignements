import express from "express";
import { addUser, deleteUser, getUserByID, getUsers, updateUser} from "../controllers/users.controller.js";
import { updateValidUser, validateUser } from "../middlewares/validateUser.middleware.js";
export const UserRouter = express.Router();

UserRouter.post("/add-user",validateUser,addUser)
UserRouter.get("/",getUsers)
UserRouter.get("/:userId",getUserByID)
UserRouter.put("/update-user/:userId",updateValidUser,updateUser)
UserRouter.delete("/delete-user/:userId",deleteUser)