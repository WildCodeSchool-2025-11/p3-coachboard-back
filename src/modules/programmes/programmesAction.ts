import type { RequestHandler } from "express";
import * as programmeRepository from "./programmesRepository.js";

export const getAll: RequestHandler = async (_req, res, next) => {
	try {
		const rows = await programmeRepository.findAll();
		res.json(rows);
	} catch (err) {
		next(err);
	}
};

export const getById: RequestHandler = async (_req, res, next) => {
	try {
		const programme = await programmeRepository.findById(
			String(_req.params.id),
		);

		if (!programme) {
			res.sendStatus(404);
			return;
		}
		res.json(programme);
	} catch (err) {
		next(err);
	}
};

export const create: RequestHandler = async (_req, res, next) => {
	try {
		const { nom, objectif, duree, id_coach } = _req.body;
		const insertId = await programmeRepository.create(
			nom,
			objectif,
			duree,
			id_coach,
		);
		res.status(201).json({ id: insertId });
	} catch (err) {
		next(err);
	}
};

export const update: RequestHandler = async (_req, res, next) => {
	try {
		const { nom, objectif, duree } = _req.body;
		const updated = await programmeRepository.update(
			String(_req.params.id),
			nom,
			objectif,
			duree,
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
		const deleted = await programmeRepository.destroy(String(_req.params.id));

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
		const rows = await programmeRepository.search(query);
		res.json(rows);
	} catch (err) {
		next(err);
	}
};
