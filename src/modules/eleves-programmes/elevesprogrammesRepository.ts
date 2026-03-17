import type { ResultSetHeader, RowDataPacket } from "mysql2";
import client from "../../database/client.js";

export const findAll = async () => {
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT * FROM eleves_programmes",
	);
	return rows;
};

export const findById = async (id: string) => {
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT * FROM eleves_programmes WHERE id_eleve_programme = ?",
		[id],
	);
	return rows[0] as RowDataPacket | undefined;
};

export const findByEleve = async (id: string) => {
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT * FROM eleves_programmes WHERE id_eleve = ?",
		[id],
	);
	return rows as RowDataPacket[];
};

export const findByProgramme = async (id: string) => {
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT * FROM eleves_programmes WHERE id_programme = ?",
		[id],
	);
	return rows as RowDataPacket[];
};

export const create = async (
	date_debut: string,
	statut: string,
	date_fin: string,
	id_eleve: number,
	id_programme: number,
) => {
	const [result] = await client.query<ResultSetHeader>(
		"INSERT INTO eleves_programmes (date_debut, statut, date_fin, id_eleve, id_programme) VALUES (?, ?, ?, ?, ?)",
		[date_debut, statut, date_fin, id_eleve, id_programme],
	);
	return result.insertId;
};

export const update = async (
	id: string,
	date_debut: string,
	statut: string,
	date_fin: string,
	id_eleve: number,
	id_programme: number,
) => {
	const [result] = await client.query<ResultSetHeader>(
		"UPDATE eleves_programmes SET date_debut = ?, statut = ?, date_fin = ?, id_eleve = ?, id_programme = ? WHERE id_eleve_programme = ?",
		[date_debut, statut, date_fin, id_eleve, id_programme, id],
	);
	return result.affectedRows > 0;
};

export const destroy = async (id: string) => {
	const [result] = await client.query<ResultSetHeader>(
		"DELETE FROM eleves_programmes WHERE id_eleve_programme = ?",
		[id],
	);
	return result.affectedRows > 0;
};
