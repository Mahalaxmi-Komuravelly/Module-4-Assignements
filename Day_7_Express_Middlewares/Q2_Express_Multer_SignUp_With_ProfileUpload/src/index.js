import express, { urlencoded } from "express";
import { UserSignupRouter } from "./routes/users.routes.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/users", UserSignupRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
