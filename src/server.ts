
import express from "express";
import "dotenv/config";
import cors from "cors";
import { dbConnection } from "./core/database/db";
import routerController from "./entities/controllers/routers";
import routerUsuarios from "./entities/usuarios/router";
import routerVuelos from "./entities/vuelos/router";
import routerAlojamiento from "./entities/alojamientos/router";
import routerReservaVuelos from "./entities/reservaVuelos/router";

const app = express();
const PORT = process.env.PORT || 2099;

app.use(express.json());
app.use(cors());

app.use('/api', routerController);
app.use('/api', routerUsuarios);
app.use('/api', routerVuelos);
app.use('/api', routerAlojamiento);
app.use('/api', routerReservaVuelos);

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