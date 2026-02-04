import express from "express";
import { signup, login } from "../controllers/auth.controller.js";
export const AuthRouter = express.Router();

AuthRouter.post("/signup",signup);
AuthRouter.post("/login",login);