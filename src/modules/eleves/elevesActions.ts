import type { RequestHandler } from "express";
import * as elevesRepository from "./elevesRepository.js";

// GET /api/eleves
export const getAll: RequestHandler = async (_req, res, next) => {
	try {
		const rows = await elevesRepository.findAll();
		res.json(rows);
	} catch (err) {
		next(err);
	}
};

// GET /api/eleves/search?query=...
export const search: RequestHandler = async (req, res, next) => {
	try {
		const query = String(req.query.query || "");
		const rows = await elevesRepository.search(query);
		res.json(rows);
	} catch (err) {
		next(err);
	}
};

// GET /api/eleves/:id
export const getById: RequestHandler = async (req, res, next) => {
	try {
		const eleves = await elevesRepository.findById(String(req.params.id));

		if (!eleves) {
			res.sendStatus(404);
			return;
		}

		res.json(eleves);
	} catch (err) {
		next(err);
	}
};

// POST /api/eleves
export const create: RequestHandler = async (req, res, next) => {
	try {
		const {
			prenom,
			nom,
			email,
			mot_de_passe,
			age,
			poids_initial,
			taille,
			objectif,
			niveau,
		} = req.body;
		const insertId = await elevesRepository.create(
			prenom,
			nom,
			email,
			mot_de_passe,
			age,
			poids_initial,
			taille,
			objectif,
			niveau,
		);
		res.status(201).json({ id: insertId });
	} catch (err) {
		next(err);
	}
};

// PUT /api/eleves/:id
export const update: RequestHandler = async (req, res, next) => {
	try {
		const {
			prenom,
			nom,
			email,
			mot_de_passe,
			age,
			poids_initial,
			taille,
			objectif,
			niveau,
		} = req.body;
		const updated = await elevesRepository.update(
			String(req.params.id),
			prenom,
			nom,
			email,
			mot_de_passe,
			age,
			poids_initial,
			taille,
			objectif,
			niveau,
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

// DELETE /api/eleves/:id
export const destroy: RequestHandler = async (req, res, next) => {
	try {
		const deleted = await elevesRepository.destroy(String(req.params.id));

		if (!deleted) {
			res.sendStatus(404);
			return;
		}

		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
};
