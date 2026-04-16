import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../app.js";

const TEST_EMAIL = "julien@coach.com";
const TEST_PASSWORD = "coach123";

describe("POST /api/auth/signin", () => {
	it("retourne un token avec des identifiants valides", async () => {
		const res = await request(app)
			.post("/api/auth/signin")
			.send({ email: TEST_EMAIL, mot_de_passe: TEST_PASSWORD });

		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty("token");
	});

	it("retourne 401 avec des identifiants invalides", async () => {
		const res = await request(app)
			.post("/api/auth/signin")
			.send({ email: "faux@email.com", mot_de_passe: "mauvais" });

		expect(res.status).toBe(401);
	});
});

describe("GET /api/eleves", () => {
	it("retourne 401 sans token", async () => {
		const res = await request(app).get("/api/eleves");
		expect(res.status).toBe(401);
	});

	it("retourne 200 avec un token valide", async () => {
		const loginRes = await request(app)
			.post("/api/auth/signin")
			.send({ email: TEST_EMAIL, mot_de_passe: TEST_PASSWORD });

		const token = loginRes.body.token;

		const res = await request(app)
			.get("/api/eleves")
			.set("Authorization", `Bearer ${token}`);

		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
	});
});
