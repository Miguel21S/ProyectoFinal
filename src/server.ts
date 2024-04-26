
import express from "express";
import "dotenv/config";
import { dbConnection } from "./core/database/db";
import routerController from "./entities/controllers/routers";

const app = express();
const PORT = process.env.PORT || 2099;

app.use(express.json());

app.use('/api', routerController);

app.get("/api/healthy", (req, res) => {
    res.status(200).json({ success: true, message: "server is healthy" })
})

dbConnection()
    .then(() => {
        console.log('Database connected');
    })
    .catch(error => {
        console.log(error)
    })
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})