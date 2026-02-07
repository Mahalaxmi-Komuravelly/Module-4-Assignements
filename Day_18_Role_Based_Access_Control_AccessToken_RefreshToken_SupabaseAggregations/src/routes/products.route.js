import express from "express";
import {getAverageOrderValue, getProducts, getTotalRevenue, getAmountSpentPerUser, getOrdersCountPerUser} from "../controllers/products.controller.js"
import { authMiddleware, authorizedRoles } from "../middlewares/auth.middleware.js";
export const ProductRouter = express.Router();

ProductRouter.get("/",authMiddleware,authorizedRoles("user"), getProducts);
ProductRouter.get("/getavgordervalue",getAverageOrderValue);
ProductRouter.get("/totalrevenue",getTotalRevenue);
ProductRouter.get("/amountspentperuser",getAmountSpentPerUser);
ProductRouter.get("/orderscountperuser",getOrdersCountPerUser);
