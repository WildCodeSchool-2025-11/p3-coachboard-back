import type { ResultSetHeader, RowDataPacket } from "mysql2";
import client from "../../database/client.js";

export const findAll = async () => {
	const [rows] = await client.query<RowDataPacket[]>("SELECT * FROM suivi");
	return rows;
};

export const findById = async (id: string) => {
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT * FROM suivi WHERE id_suivi = ?",
		[id],
	);
	return rows[0] as RowDataPacket | undefined;
};

export const findBySeance = async (id: string) => {
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT * FROM suivi WHERE id_seance = ?",
		[id],
	);
	return rows as RowDataPacket[];
};

export const findByDate = async (date: string) => {
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT * FROM suivi WHERE date = ?",
		[date],
	);
	return rows as RowDataPacket[];
};

export const create = async (
	charge_soulevee: number,
	reps_reelle: number,
	poids_corporel: number,
	ressenti: string,
	commentaires: string,
	date: string,
	statut: string,
	id_seance: number,
	id_seances_exercices: number,
	id_eleve_programme: number,
) => {
	const [result] = await client.query<ResultSetHeader>(
		"INSERT INTO suivi (charge_soulevee, reps_reelle, poids_corporel, ressenti, commentaires, date, statut, id_seance, id_seances_exercices, id_eleve_programme) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
		[
			charge_soulevee,
			reps_reelle,
			poids_corporel,
			ressenti,
			commentaires,
			date,
			statut,
			id_seance,
			id_seances_exercices,
			id_eleve_programme,
		],
	);
	return result.insertId;
};

export const update = async (
	id: string,
	charge_soulevee: number,
	reps_reelle: number,
	poids_corporel: number,
	ressenti: string,
	commentaires: string,
	date: string,
	statut: string,
	id_seance: number,
	id_seances_exercices: number,
	id_eleve_programme: number,
) => {
	const [result] = await client.query<ResultSetHeader>(
		"UPDATE suivi SET charge_soulevee = ?, reps_reelle = ?, poids_corporel = ?, ressenti = ?, commentaires = ?, date = ?, statut = ?, id_seance = ?, id_seances_exercices = ?, id_eleve_programme = ? WHERE id_suivi = ?",
		[
			charge_soulevee,
			reps_reelle,
			poids_corporel,
			ressenti,
			commentaires,
			date,
			statut,
			id_seance,
			id_seances_exercices,
			id_eleve_programme,
			id,
		],
	);
	return result.affectedRows > 0;
};

export const destroy = async (id: string) => {
	const [result] = await client.query<ResultSetHeader>(
		"DELETE FROM suivi WHERE id_suivi = ?",
		[id],
	);
	return result.affectedRows > 0;
};
