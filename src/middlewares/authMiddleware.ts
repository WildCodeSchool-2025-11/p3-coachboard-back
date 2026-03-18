import bcrypt from "bcrypt";
import type { RequestHandler } from "express";
import * as authRepository from "../modules/auth/authRepository.js";

export const checkLogin: RequestHandler = async (req, res, next) => {
	const { email, mot_de_passe, role } = req.body;

	const user =
		role === "coach"
			? await authRepository.findCoachByEmail(email)
			: await authRepository.findEleveByEmail(email);

	if (!user) {
		res.sendStatus(401).json({ message: "Utilisateur introuvable" });
		return;
	}

	const passwordValide = bcrypt.compareSync(mot_de_passe, user.MOT_DE_PASSE);

	if (!passwordValide) {
		res.sendStatus(401).json({ message: "Mauvais identifiants" });
		return;
	}

	req.body.user = { ...user, role };
	next();
};
