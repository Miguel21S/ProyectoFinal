
import { Router } from "express";
import * as accommodation from "./Accommodation";
import { auth } from "../../core/middlewares/auth";
import { isSuperAdmin } from "../../core/middlewares/isSuperAdministrador";

const router = Router();

router.post('/auth/create/accommodation', auth, isSuperAdmin, accommodation.createAccommodation);
router.get('/auth/list/accommodation', accommodation.listAccommodation);
router.put('/auth/update/accommodation/:id', auth, isSuperAdmin, accommodation.updateAccommodation);
router.delete('/auth/delete/accommodation/:id', auth, isSuperAdmin, accommodation.deleteAccommodation);

export default router;