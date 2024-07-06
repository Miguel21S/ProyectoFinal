
import { Router } from "express";
import * as reserveAccommodatios from "./ReservationAccommodations";
import { auth } from "../../core/middlewares/auth";
import { isSuperAdmin } from "../../core/middlewares/isSuperAdministrador";


const router = Router();

router.post('/create/reserve/accommodation/:id', auth, reserveAccommodatios.createReserveAccommodation);
router.get('/auth/list/reserve/accommodation/admin', auth, isSuperAdmin, reserveAccommodatios.listReserveAccommodationAdmin);
router.get('/my/list/reserve/accommodation/user', auth, reserveAccommodatios.mysReserveAccommodation);
router.put('/update/reserve/accommodation/:id', auth, reserveAccommodatios.editReserveAccommodation);
router.delete('/delete/reserve/accommodation/:id', auth, reserveAccommodatios.deleteReserveAccommodation);
router.delete('/delete/reserve/accommodation/profile/:id', auth, reserveAccommodatios.deleteMyReserveAccommodation);

export default router;