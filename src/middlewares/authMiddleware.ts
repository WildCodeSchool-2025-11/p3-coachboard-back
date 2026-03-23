import bcrypt from "bcrypt";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
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

		const passwordValide = await bcrypt.compare(
			mot_de_passe,
			user.MOT_DE_PASSE,
		);

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

export const verifyToken: RequestHandler = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			res.status(401).json({ message: "Token manquant" });
			return;
		}

		const token = authHeader.split(" ")[1];

		const secret = process.env.JWT_SECRET;
		if (!secret) throw new Error("JWT_SECRET manquant");

		const result = jwt.verify(token, secret);
		(req as any).user = result;
		next();
	} catch (_err) {
		res.status(401).json({ message: "Token invalide ou expiré" });
	}
};
