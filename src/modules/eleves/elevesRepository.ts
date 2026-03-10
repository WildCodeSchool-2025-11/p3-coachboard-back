import type { ResultSetHeader, RowDataPacket } from "mysql2";
import client from "../../database/client.js";

export const findAll = async () => {
	const [rows] = await client.query<RowDataPacket[]>("SELECT * FROM eleves");
	return rows;
};

export const search = async (query: string) => {
	const likeQuery = `%${query}%`;
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT * FROM eleves WHERE prenom LIKE ? OR nom LIKE ?",
		[likeQuery, likeQuery],
	);
	return rows;
};

export const findById = async (id: string) => {
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT * FROM eleves WHERE id_eleve = ?",
		[id],
	);
	return rows[0] as RowDataPacket | undefined;
};

export const create = async (
	prenom: string,
	nom: string,
	email: string,
	mot_de_passe: string,
	age: number,
	poids_initial: number,
	taille: number,
	objectif: string,
	niveau: string,
) => {
	const [result] = await client.query<ResultSetHeader>(
		"INSERT INTO eleves (prenom, nom, email, mot_de_passe, age, poids_initial, taille, objectif, niveau) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
		[
			prenom,
			nom,
			email,
			mot_de_passe,
			age,
			poids_initial,
			taille,
			objectif,
			niveau,
		],
	);
	return result.insertId;
};

export const update = async (
	id: string,
	prenom: string,
	nom: string,
	email: string,
	mot_de_passe: string,
	age: number,
	poids_initial: number,
	taille: number,
	objectif: string,
	niveau: string,
) => {
	const [result] = await client.query<ResultSetHeader>(
		"UPDATE eleves SET prenom = ?, nom = ?, email = ?, mot_de_passe = ?, age = ?, poids_initial = ?, taille = ?, objectif = ?, niveau = ? WHERE id_eleve = ?",
		[
			prenom,
			nom,
			email,
			mot_de_passe,
			age,
			poids_initial,
			taille,
			objectif,
			niveau,
			id,
		],
	);
	return result.affectedRows > 0;
};

export const destroy = async (id: string) => {
	const [result] = await client.query<ResultSetHeader>(
		"DELETE FROM eleves WHERE id_eleve = ?",
		[id],
	);
	return result.affectedRows > 0;
};
