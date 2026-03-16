import type { RequestHandler } from "express";
import * as seances_exercicesRepository from "../seances_exercices/seances_exercicesRepository.js";

export const getBySeance: RequestHandler<{ id_seance: string }> = async (
	req,
	res,
	next,
) => {
	try {
		const { id_seance } = req.params;
		const seances_exercices =
			await seances_exercicesRepository.findBySeance(id_seance);

		res.json(seances_exercices);
	} catch (err) {
		next(err);
	}
};
