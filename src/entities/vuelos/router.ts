
import { Router } from "express";
import { auth } from "../../core/middlewares/auth";
import { isSuperAdmin } from "../../core/middlewares/isSuperAdministrador";
import * as vuelos from "./Vuelo";

const router = Router();

router.post('/auth/vuelo', auth, isSuperAdmin, vuelos.adicionarVuelo);
router.get('/auth/vuelo', auth, isSuperAdmin, vuelos.listarVuelos);
router.put('/auth/vuelo', auth, isSuperAdmin, vuelos.actualizarVuelo);
router.delete('/auth/vuelo/:id', auth, isSuperAdmin, vuelos.eliminarVuelo);

export default router;