
import {Router} from "express";
import * as usuarios from "./Usuarios";
import { auth } from "../../core/middlewares/auth";
import { isSuperAdmin } from "../../core/middlewares/isSuperAdministrador";

const router = Router();

router.get('/users', auth, isSuperAdmin, usuarios.listarTodosUsuarios)

export default router