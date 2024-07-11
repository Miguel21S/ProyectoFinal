
import { Router } from "express";
import * as accommodation from "./Accommodation";
import { auth } from "../../core/middlewares/auth";
import { isSuperAdmin } from "../../core/middlewares/isSuperAdministrador";

const router = Router();

router.post('/create/accommodation', auth, isSuperAdmin, accommodation.createAccommodation);
router.get('/list/accommodation', accommodation.listAccommodation);
router.put('/update/accommodation/:id', auth, isSuperAdmin, accommodation.updateAccommodation);
router.delete('/deletee/accommodation/:id', auth, isSuperAdmin, accommodation.deleteAccommodation);

export default router;