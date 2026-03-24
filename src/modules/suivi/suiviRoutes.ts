import { Router } from "express";
import {
	create,
	destroy,
	getAll,
	getByDate,
	getById,
	getBySeance,
	update,
} from "./suiviActions.js";

const router = Router();

router.get("/seance/:id_seance", getBySeance);
router.get("/date/:date", getByDate);
router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;
