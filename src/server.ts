
import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 2099;

app.use(express.json());

app.get("/api/healthy", (req, res) => {
    res.status(200).json({ success: true, message: "server is healthy" })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})