
import { Router } from "express";
import * as reserveFlight from "./ReservationFlights";
import { auth } from "../../core/middlewares/auth";
import { isSuperAdmin } from "../../core/middlewares/isSuperAdministrador";

const router = Router();

router.post('/create/reserve/flight/:id', auth, reserveFlight.createReserveFlight);
router.get('/list/reserve/flight/user', auth, reserveFlight.myReserveFlightUser);
router.get('/list/reserve/flight/admin', auth, isSuperAdmin, reserveFlight.listReserveFlightSuperAdmin);
router.delete('/delete/reserve/flight/profile/:id', auth, reserveFlight.deleteMyReserveFlightProfile);
router.delete('/delete/reserve/flight/:id', auth, isSuperAdmin, reserveFlight.deletereserveFlightSuperAdmin);

// router.put('/reserva/vuelo/:id', auth, isSuperAdmin, reservaVuelo.actualizarReservaVuelo);

export default router;