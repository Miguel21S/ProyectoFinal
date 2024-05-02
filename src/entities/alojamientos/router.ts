
import { Router } from "express";
import * as alojamiento from "./Alojamiento";
import { auth } from "../../core/middlewares/auth";
import { isSuperAdmin } from "../../core/middlewares/isSuperAdministrador";

const router = Router();

router.post('/auth/alojamiento', auth, isSuperAdmin, alojamiento.crearAlojamiento);

export default router;