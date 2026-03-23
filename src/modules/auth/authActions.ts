import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const signin: RequestHandler = async (req, res, next) => {
	try {
		const { user } = req.body;

		const secret = process.env.JWT_SECRET;
		if (!secret) throw new Error("JWT_SECRET manquant");

		const token = jwt.sign(
			{
				id: user.role === "coach" ? user.ID_COACH : user.ID_ELEVE,
				email: user.EMAIL,
				role: user.role,
			},
			secret,
			{ expiresIn: "24h" },
		);
		res.json({ token });
	} catch (err) {
		next(err);
	}
};
