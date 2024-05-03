
import { Router } from "express";
import * as alojamiento from "./Alojamiento";
import { auth } from "../../core/middlewares/auth";
import { isSuperAdmin } from "../../core/middlewares/isSuperAdministrador";

const router = Router();

router.post('/auth/alojamiento', auth, isSuperAdmin, alojamiento.crearAlojamiento);
router.get('/auth/alojamiento', auth, isSuperAdmin, alojamiento.listarAlojamiento);
router.put('/auth/alojamiento/:id', auth, isSuperAdmin, alojamiento.actualizarAlojamiento);
router.delete('/auth/alojamiento/:id', auth, isSuperAdmin, alojamiento.eliminarAlojamiento);

export default router;