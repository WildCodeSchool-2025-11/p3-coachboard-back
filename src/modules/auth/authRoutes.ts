import { Router } from "express";
import { checkLogin } from "../../middlewares/authMiddleware.js";
import { signin } from "./authActions.js";

const router = Router();

router.post("/signin", checkLogin, signin);

export default router;
