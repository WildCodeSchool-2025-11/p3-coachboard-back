import type { RequestHandler } from "express";
import * as elevesProgrammesRepository from "./elevesprogrammesRepository.js";

// GET /api/elevesprogrammes
export const getAll: RequestHandler = async (_req, res, next) => {
	try {
		const rows = await elevesProgrammesRepository.findAll();
		res.json(rows);
	} catch (err) {
		next(err);
	}
};

// GET /api/elevesprogrammes/:id
export const getById: RequestHandler = async (req, res, next) => {
	try {
		const elevesProgrammes = await elevesProgrammesRepository.findById(
			String(req.params.id),
		);
		if (!elevesProgrammes) {
			res.status(404).json({ error: "Programme non trouvé" });
			return;
		}
		res.json(elevesProgrammes);
	} catch (err) {
		next(err);
	}
};

// GET /api/elevesprogrammes/eleve/:id
export const getByEleve: RequestHandler = async (req, res, next) => {
	try {
		const elevesProgrammes = await elevesProgrammesRepository.findByEleve(
			String(req.params.id),
		);
		res.json(elevesProgrammes);
	} catch (err) {
		next(err);
	}
};

// GET /api/elevesprogrammes/programme/:id
export const getByProgramme: RequestHandler = async (req, res, next) => {
	try {
		const elevesProgrammes = await elevesProgrammesRepository.findByProgramme(
			String(req.params.id),
		);
		res.json(elevesProgrammes);
	} catch (err) {
		next(err);
	}
};

// POST /api/elevesprogrammes
export const create: RequestHandler = async (req, res, next) => {
	try {
		const { date_debut, statut, date_fin, id_eleve, id_programme } = req.body;
		const elevesProgrammes = await elevesProgrammesRepository.create(
			date_debut,
			statut,
			date_fin,
			id_eleve,
			id_programme,
		);
		res.status(201).json({ id: elevesProgrammes });
	} catch (err) {
		next(err);
	}
};

// PUT /api/elevesprogrammes/:id
export const update: RequestHandler = async (req, res, next) => {
	try {
		const { date_debut, statut, date_fin, id_eleve, id_programme } = req.body;
		const updated = await elevesProgrammesRepository.update(
			String(req.params.id),
			date_debut,
			statut,
			date_fin,
			id_eleve,
			id_programme,
		);

		if (!updated) {
			res.status(404).json({ error: "Programme non trouvé" });
			return;
		}

		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
};

// DELETE /api/elevesprogrammes/:id
export const destroy: RequestHandler = async (req, res, next) => {
	try {
		const deleted = await elevesProgrammesRepository.destroy(
			String(req.params.id),
		);

		if (!deleted) {
			res.status(404).json({ error: "Programme non trouvé" });
			return;
		}

		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
};
