import express from "express";
import { AuthRouter } from "./routes/auth.routes.js";
import { ProductRouter } from "./routes/products.route.js";

const app = express();

app.use(express.json());
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter)
export default app;