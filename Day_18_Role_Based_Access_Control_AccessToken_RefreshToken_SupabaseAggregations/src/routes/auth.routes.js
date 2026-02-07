import express from "express";
import { signup,login, refreshToken } from "../controllers/auth.controllers.js";
export const AuthRouter = express.Router();

AuthRouter.post("/signup", signup);
AuthRouter.post("/login", login);
AuthRouter.post("/refresh",refreshToken);