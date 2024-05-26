
import { Router } from "express";
import * as reservaVuelo from "./ReservaVuelos";
import { auth } from "../../core/middlewares/auth";
import { isSuperAdmin } from "../../core/middlewares/isSuperAdministrador";

const router = Router();

router.post('/reserva/vuelo/:id', auth, reservaVuelo.crearReservaVuelo);
router.get('/lista/reserva/vuelo/admin', auth, isSuperAdmin, reservaVuelo.listaDeReservaDeVuelosAdmin);
router.get('/lista/reserva/vuelo/usuario', auth, reservaVuelo.misReservarVueloUsuario);
// router.put('/reserva/vuelo/:id', auth, isSuperAdmin, reservaVuelo.actualizarReservaVuelo);
router.delete('/reserva/vuelo/:id', auth, isSuperAdmin, reservaVuelo.eliminarReservaVuelo);

router.delete('/rereserva/vuelo/perfil/:id', auth, reservaVuelo.eliminarMiReservaVuelo);

export default router;