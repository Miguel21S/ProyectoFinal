
import { Router } from "express";
import * as reservaAlojamiento from "./ReservaAlojamienos";
import { auth } from "../../core/middlewares/auth";
import { isSuperAdmin } from "../../core/middlewares/isSuperAdministrador";


const router = Router();

router.post('/crear/reserva/:id', auth, reservaAlojamiento.crearReservaAlojamiento);
router.get('/reserva', auth, isSuperAdmin, reservaAlojamiento.listarReservaAlojamiento);
router.get('/mis/reserva', auth, reservaAlojamiento.misReservarAlojamiento);
router.put('/actualizar/reserva/:id', auth, reservaAlojamiento.editarReservaAlojamiento);
router.delete('/eliminar/reserva/:id', auth, reservaAlojamiento.eliminarReservaAlojamiento);

export default router;