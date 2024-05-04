
import { Router } from "express";
import * as reservaVuelo from "./ReservaVuelos";
import { auth } from "../../core/middlewares/auth";
import { isSuperAdmin } from "../../core/middlewares/isSuperAdministrador";

const router = Router();

router.post('/reserva/vuelo/:id', auth, reservaVuelo.crearReservaVuelo);
router.get('/lista/reserva/vuelo', auth, isSuperAdmin, reservaVuelo.listaDeReservaDeVuelos);
router.delete('/reserva/vuelo/:id', auth, reservaVuelo.eliminarReservaVuelo);

export default router;