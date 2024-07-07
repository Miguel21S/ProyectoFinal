
import { Router } from "express";
import { auth } from "../../core/middlewares/auth";
import { isSuperAdmin } from "../../core/middlewares/isSuperAdministrador";
import * as flights from "./Flights";

const router = Router();

router.post('/add/flight', auth, isSuperAdmin, flights.addFlights);
router.get('/list/flight', flights.listFlights);
router.put('/update/flight/:id', auth, isSuperAdmin, flights.updateFlights);
router.delete('/delete/flight/:id', auth, isSuperAdmin, flights.deleteFlights);

export default router;