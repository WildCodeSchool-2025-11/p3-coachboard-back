import type { RequestHandler } from "express";
import * as coachRepository from "../coach/coachRepository.js";

export const getAll: RequestHandler = async (_req, res, next) => {
	try {
		const rows = await coachRepository.findAll();
		res.json(rows);
	} catch (err) {
		next(err);
	}
};

export const getById: RequestHandler = async (_req, res, next) => {
	try {
		const coach = await coachRepository.findById(String(_req.params.id));

		if (!coach) {
			res.sendStatus(404);
			return;
		}
		res.json(coach);
	} catch (err) {
		next(err);
	}
};
