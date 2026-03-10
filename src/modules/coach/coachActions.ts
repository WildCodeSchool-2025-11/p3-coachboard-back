import type { RequestHandler } from "express";
import * as coachRepository from "../coach/coachRepository.js";

export const findAll: RequestHandler = async (_req_, res, next) => {
	try {
		const [rows] = await coachRepository.findAll();
		res.json(rows);
	} catch (err) {
		next(err);
	}
};
