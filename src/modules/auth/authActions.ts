import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const signin: RequestHandler = async (req, res, next) => {
	try {
		const { user } = req.body;

		const secret = process.env.JWT_SECRET;
		if (!secret) throw new Error("JWT_SECRET manquant");

		const token = jwt.sign(
			{
				id: user.id,
				email: user.email,
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
