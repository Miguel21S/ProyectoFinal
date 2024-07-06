
import express from "express";
import "dotenv/config";
import cors from "cors";
import { dbConnection } from "./core/database/db";
import routerController from "./entities/controllers/routers";
import routerUsers from "./entities/users/router";
import routerFlights from "./entities/flights/router";
import routerAccommodations from "./entities/accommodation/router";
import routerReserveFlights from "./entities/reserveFlights/router";
import routerReserveAccommodations from "./entities/reserveAccommodation/router";

const app = express();
const PORT = process.env.PORT || 2099;

app.use(express.json());
app.use(cors());

app.use('/api', routerController);
app.use('/api', routerUsers);
app.use('/api', routerFlights);
app.use('/api', routerAccommodations);
app.use('/api', routerReserveFlights);
app.use('/api', routerReserveAccommodations);

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