import { Router } from "express";
import {
	create,
	destroy,
	getAll,
	getByEleve,
	getById,
	getByProgramme,
	update,
} from "./elevesprogrammesActions.js";

const router = Router();

router.get("/", getAll);
router.get("/eleve/:id", getByEleve);
router.get("/programme/:id", getByProgramme);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;
