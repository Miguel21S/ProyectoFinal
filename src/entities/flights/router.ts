
import { Router } from "express";
import { auth } from "../../core/middlewares/auth";
import { isSuperAdmin } from "../../core/middlewares/isSuperAdministrador";
import * as flights from "./Flights";

const router = Router();

router.post('/auth/add/flight', auth, isSuperAdmin, flights.addFlights);
router.get('/auth/list/flight', flights.listFlights);
router.put('/auth/update/flight/:id', auth, isSuperAdmin, flights.updateFlights);
router.delete('/auth/delete/flight/:id', auth, isSuperAdmin, flights.deleteFlights);

export default router;