import express from "express";
import {getProducts} from "../controllers/products.controller.js"
import { authMiddleware, authorizedRoles } from "../middlewares/auth.middleware.js";
export const ProductRouter = express.Router();

ProductRouter.get("/",authMiddleware,authorizedRoles("user"), getProducts);
