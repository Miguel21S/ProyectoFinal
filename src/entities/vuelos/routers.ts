
import { Router } from "express";
import { auth } from "../../core/middlewares/auth";
import { isSuperAdmin } from "../../core/middlewares/isSuperAdministrador";
import * as vuelos from "./Vuelo";
const router = Router();

router.post('/auth/vuelo', auth, isSuperAdmin, vuelos.adicionarVuelo);

export default router;