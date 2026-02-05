import app from "./app.js";
import { checkDB } from "./utils/checkDB.js";

const PORT = process.env.PORT || 6852;

app.listen(PORT, async () => {
    await checkDB();
    console.log(`Server running on http://localhost:${PORT}`)
})