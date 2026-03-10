import type { ResultSetHeader, RowDataPacket } from "mysql2";
import client from "../../database/client.js";

export const findAll = async () => {
	const [rows] = await client.query<RowDataPacket[]>("SELECT * FROM COACH");
	return rows;
};

export const search = async (nom: string) => {
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT * FROM COACH WHERE NOM LIKE ? ",
		[`%${nom}%`],
	);
	return rows;
};

export const findById = async (id: string) => {
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT * FROM COACH WHERE ID_COACH = ?",
		[id],
	);
	return rows[0] as RowDataPacket | undefined;
};

export const create = async (
	prenom: string,
	nom: string,
	email: string,
	motDePasse: string,
) => {
	const [result] = await client.query<ResultSetHeader>(
		"INSERT INTO COACH (PRENOM, NOM, EMAIL, MOT_DE_PASSE) VALUES(?, ?, ?, ?)",
		[prenom, nom, email, motDePasse],
	);
	return result.insertId;
};

export const update = async (
	id: string,
	prenom: string,
	nom: string,
	email: string,
	motDePasse: string,
) => {
	const [result] = await client.query<ResultSetHeader>(
		"UPDATE COACH SET PRENOM = ?, NOM = ?, EMAIL = ?, MOT_DE_PASSE = ? WHERE ID_COACH = ?",
		[prenom, nom, email, motDePasse, id],
	);
	return result.affectedRows > 0;
};

export const destroy = async (id: string) => {
	const [result] = await client.query<ResultSetHeader>(
		"DELETE FROM COACH WHERE ID_COACH = ?",
		[id],
	);
	return result.affectedRows > 0;
};
