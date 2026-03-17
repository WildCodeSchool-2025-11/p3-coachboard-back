import { Router } from "express";
import coachRoutes from "./modules/coach/coachRoutes.js";
import elevesRoutes from "./modules/eleves/elevesRoutes.js";
import elevesProgrammesRoutes from "./modules/eleves-programmes/elevesprogrammesRoutes.js";
import exercicesRoutes from "./modules/exercices/exercicesRoutes.js";
import itemsRoutes from "./modules/items/itemsRoutes.js";
import programmesRoutes from "./modules/programmes/programmesRoute.js";
import seancesExercicesRoutes from "./modules/seances_exercices/seances_exercicesRoutes.js";

const router = Router();

router.use("/api/items", itemsRoutes);
router.use("/api/eleves-programmes", elevesProgrammesRoutes);
router.use("/api/eleves", elevesRoutes);
router.use("/api/coach", coachRoutes);
router.use("/api/exercices", exercicesRoutes);
router.use("/api/seances-exercices", seancesExercicesRoutes);
router.use("/api/programmes", programmesRoutes);

export default router;
