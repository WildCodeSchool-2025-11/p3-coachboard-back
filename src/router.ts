import { Router } from "express";
import elevesRoutes from "./modules/eleves/elevesRoutes.js";
import itemsRoutes from "./modules/items/itemsRoutes.js";

const router = Router();

router.use("/api/items", itemsRoutes);
router.use("/api/eleves", elevesRoutes);

export default router;
