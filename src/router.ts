import { Router } from "express";
import coachRoutes from "./modules/coach/coachRoutes.js";
import elevesRoutes from "./modules/eleves/elevesRoutes.js";
import itemsRoutes from "./modules/items/itemsRoutes.js";

const router = Router();

router.use("/api/items", itemsRoutes);
router.use("/api/eleves", elevesRoutes);
router.use("/api/coach", coachRoutes);

export default router;
