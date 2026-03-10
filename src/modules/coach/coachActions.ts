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

export const create: RequestHandler = async (_req, res, next) => {
	try {
		const { prenom, nom, email, mot_de_passe } = _req.body;
		const insertId = await coachRepository.create(
			prenom,
			nom,
			email,
			mot_de_passe,
		);
		res.status(201).json({ id: insertId });
	} catch (err) {
		next(err);
	}
};

export const update: RequestHandler = async (_req, res, next) => {
	try {
		const { prenom, nom, email, mot_de_passe } = _req.body;
		const updated = await coachRepository.update(
			String(_req.params.id),
			prenom,
			nom,
			email,
			mot_de_passe,
		);
		if (!updated) {
			res.sendStatus(404);
			return;
		}
		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
};

export const destroy: RequestHandler = async (_req, res, next) => {
	try {
		const deleted = await coachRepository.destroy(String(_req.params.id));

		if (!deleted) {
			res.sendStatus(404);
			return;
		}
		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
};

export const search: RequestHandler = async (req, res, next) => {
	try {
		const query = String(req.query.query || "");
		const rows = await coachRepository.search(query);
		res.json(rows);
	} catch (err) {
		next(err);
	}
};
