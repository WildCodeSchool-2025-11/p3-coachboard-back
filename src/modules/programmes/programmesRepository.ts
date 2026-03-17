import type { ResultSetHeader, RowDataPacket } from "mysql2";
import client from "../../database/client.js";

export const findAll = async () => {
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT * FROM PROGRAMMES",
	);
	return rows;
};

export const search = async (nom: string) => {
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT * FROM PROGRAMMES WHERE NOM LIKE ? ",
		[`%${nom}%`],
	);
	return rows;
};

export const findById = async (id: string) => {
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT * FROM PROGRAMMES WHERE ID_PROGRAMME = ?",
		[id],
	);
	return rows[0] as RowDataPacket | undefined;
};

export const create = async (
	nom: string,
	objectif: string,
	duree: number,
	idCoach: number,
) => {
	const [result] = await client.query<ResultSetHeader>(
		"INSERT INTO PROGRAMMES (NOM, OBJECTIF, DUREE, ID_COACH) VALUES(?, ?, ?, ?)",
		[nom, objectif, duree, idCoach],
	);
	return result.insertId;
};

export const update = async (
	id: string,
	nom: string,
	objectif: string,
	duree: number,
) => {
	const [result] = await client.query<ResultSetHeader>(
		"UPDATE PROGRAMMES SET NOM = ?, OBJECTIF = ?, DUREE = ? WHERE ID_PROGRAMME = ?",
		[nom, objectif, duree, id],
	);
	return result.affectedRows > 0;
};

export const destroy = async (id: string) => {
	const [result] = await client.query<ResultSetHeader>(
		"DELETE FROM PROGRAMMES WHERE ID_PROGRAMME = ?",
		[id],
	);
	return result.affectedRows > 0;
};
