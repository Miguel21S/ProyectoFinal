
import {Router} from "express";
import * as usuarios from "./Usuarios";
import { auth } from "../../core/middlewares/auth";
import { isSuperAdmin } from "../../core/middlewares/isSuperAdministrador";

const router = Router();

router.get('/users', auth, isSuperAdmin, usuarios.listarTodosUsuarios)
router.get('/perfil', auth, usuarios.miPerfil)
router.put('/users/profile/:id', auth, isSuperAdmin, usuarios.actualizarUsuario);
router.delete('/users/:id', auth, isSuperAdmin, usuarios.eliminarUsuarioId)


export default router