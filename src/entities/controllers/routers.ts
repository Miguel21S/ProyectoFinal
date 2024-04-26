
import * as controller from "./authControllers";
import { Router  } from "express";

const router = Router();

router.post('/auth/register', controller.registrar);
router.post('/auth/loguear', controller.loguear);

export default router