
import { Router } from "express";
import * as reservaVuelo from "./ReservaVuelos";
import { auth } from "../../core/middlewares/auth";

const router = Router();

router.post('/reserva/vuelo/:id', auth, reservaVuelo.crearReservaVuelo);

export default router;