import { Router } from "express";
import itemsRoutes from "./modules/items/itemsRoutes.js";
import elevesRoutes from "./modules/eleves/elevesRoutes.js";

const router = Router();

router.use("/api/items", itemsRoutes);
router.use("/api/eleves", elevesRoutes);

export default router;
