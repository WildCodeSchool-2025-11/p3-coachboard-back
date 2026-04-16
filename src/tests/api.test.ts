import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../app.js";

const TEST_EMAIL = "julien@coach.com";
const TEST_PASSWORD = "coach123";

// test 1 et 2 : auth valide / invalide
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

// test 3 et 4 : protection des routes (sans token → 401 / avec token → 200)
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

// test 5 : création de données en base (POST authentifié > 201 )
describe("POST /api/seances", () => {
	it("crée une séance et retourne 201 avec un token valide", async () => {
		const loginRes = await request(app)
			.post("/api/auth/signin")
			.send({ email: TEST_EMAIL, mot_de_passe: TEST_PASSWORD });

		const token = loginRes.body.token;

		// Récupère un programme existant dynamiquement
		const progRes = await request(app)
			.get("/api/programmes")
			.set("Authorization", `Bearer ${token}`);

		const idProgramme = progRes.body[0].ID_PROGRAMME;

		const res = await request(app)
			.post("/api/seances")
			.set("Authorization", `Bearer ${token}`)
			.send({
				titre: "Séance test vitest",
				jour: "Lundi",
				ordre: 1,
				id_programme: idProgramme,
			});

		expect(res.status).toBe(201);
		expect(res.body).toHaveProperty("id");
	});
});

// test 6 :  modification de données (PUT authentifié → 204)
describe("PUT /api/seances/:id", () => {
	it("modifie une séance et retourne 204 avec un token valide", async () => {
		const loginRes = await request(app)
			.post("/api/auth/signin")
			.send({ email: TEST_EMAIL, mot_de_passe: TEST_PASSWORD });

		const token = loginRes.body.token;

		// Récupère une séance existante dynamiquement
		const seancesRes = await request(app)
			.get("/api/seances")
			.set("Authorization", `Bearer ${token}`);

		const idSeance = seancesRes.body[0].ID_SEANCE;

		const res = await request(app)
			.put(`/api/seances/${idSeance}`)
			.set("Authorization", `Bearer ${token}`)
			.send({
				titre: "Séance modifiée vitest",
				jour: "Mardi",
				ordre: 2,
				id_programme: seancesRes.body[0].ID_PROGRAMME,
			});

		expect(res.status).toBe(204);
	});
});

// test 7 : suppression de données (DELETE authentifié → 204)
describe("DELETE /api/seances/:id", () => {
	it("supprime une séance et retourne 204 avec un token valide", async () => {
		const loginRes = await request(app)
			.post("/api/auth/signin")
			.send({ email: TEST_EMAIL, mot_de_passe: TEST_PASSWORD });

		const token = loginRes.body.token;

		// Récupère un programme existant dynamiquement
		const progRes = await request(app)
			.get("/api/programmes")
			.set("Authorization", `Bearer ${token}`);

		const idProgramme = progRes.body[0].ID_PROGRAMME;

		// Crée une séance fraîche à supprimer
		const createRes = await request(app)
			.post("/api/seances")
			.set("Authorization", `Bearer ${token}`)
			.send({
				titre: "Séance à supprimer vitest",
				jour: "Mercredi",
				ordre: 99,
				id_programme: idProgramme,
			});

		const idSeance = createRes.body.id;

		const res = await request(app)
			.delete(`/api/seances/${idSeance}`)
			.set("Authorization", `Bearer ${token}`);

		expect(res.status).toBe(204);
	});
});
