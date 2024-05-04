
import { Router } from "express";
import * as reservaVuelo from "./ReservaVuelos";
import { auth } from "../../core/middlewares/auth";

const router = Router();

router.post('/reserva/vuelo/:id', auth, reservaVuelo.crearReservaVuelo);
router.get('/lista/reserva/vuelo', auth, reservaVuelo.listaDeReservaDeVuelos);

export default router;