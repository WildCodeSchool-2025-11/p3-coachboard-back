import bcrypt from "bcrypt";
import type { RequestHandler } from "express";
import * as authRepository from "../modules/auth/authRepository.js";

export const checkLogin: RequestHandler = async (req, res, next) => {
	try {
		const { email, mot_de_passe } = req.body;

		let user = await authRepository.findCoachByEmail(email);
		let role = "coach";

		if (!user) {
			user = await authRepository.findEleveByEmail(email);
			role = "eleve";
		}

		if (!user) {
			res.status(401).json({ message: "Utilisateur introuvable" });
			return;
		}

		const passwordValide = bcrypt.compareSync(mot_de_passe, user.MOT_DE_PASSE);

		if (!passwordValide) {
			res.status(401).json({ message: "Mauvais identifiants" });
			return;
		}

		req.body.user = { ...user, role };
		next();
	} catch (err) {
		next(err);
	}
};
