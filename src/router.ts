import { Router } from "express";
import { verifyToken } from "./middlewares/authMiddleware.js";
import authRoutes from "./modules/auth/authRoutes.js";
import coachRoutes from "./modules/coach/coachRoutes.js";
import elevesRoutes from "./modules/eleves/elevesRoutes.js";
import elevesProgrammesRoutes from "./modules/eleves-programmes/elevesprogrammesRoutes.js";
import exercicesRoutes from "./modules/exercices/exercicesRoutes.js";
import itemsRoutes from "./modules/items/itemsRoutes.js";
import programmesRoutes from "./modules/programmes/programmesRoute.js";
import seancesRoutes from "./modules/seances/seancesRoutes.js";
import seancesExercicesRoutes from "./modules/seances_exercices/seances_exercicesRoutes.js";

const router = Router();

router.use("/api/items", itemsRoutes);
router.use("/api/eleves-programmes", verifyToken, elevesProgrammesRoutes);
router.use("/api/eleves", verifyToken, elevesRoutes);
router.use("/api/coach", verifyToken, coachRoutes);
router.use("/api/exercices", verifyToken, exercicesRoutes);
router.use("/api/seances-exercices", verifyToken, seancesExercicesRoutes);
router.use("/api/programmes", verifyToken, programmesRoutes);
router.use("/api/seances", verifyToken, seancesRoutes);
router.use("/api/auth", authRoutes);

export default router;
