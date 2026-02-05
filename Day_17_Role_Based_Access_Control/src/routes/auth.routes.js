import express from "express";
import { signup,login } from "../controllers/auth.controllers.js";
export const AuthRouter = express.Router();

AuthRouter.post("/signup", signup);
AuthRouter.post("/login", login);