
import {Router} from "express";
import * as user from "./Users";
import { auth } from "../../core/middlewares/auth";
import { isSuperAdmin } from "../../core/middlewares/isSuperAdministrador";

const router = Router();

router.get('/list/users', auth, isSuperAdmin, user.listAllUsers)
router.get('/user/profile', auth, user.myProfile)
router.put('/update/users/profile/:id', auth, user.updateUsers);
router.delete('/delete/users/:id', auth, isSuperAdmin, user.deleteUsersById)


export default router