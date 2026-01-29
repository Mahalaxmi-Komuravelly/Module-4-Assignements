import express from "express"
import { addUser, myProfile } from "../controllers/users.controller.js";
export const UserRouter = express.Router();

UserRouter.post("/signup",addUser)
UserRouter.get("/myprofile",myProfile)