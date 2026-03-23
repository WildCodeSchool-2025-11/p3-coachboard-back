import type { RowDataPacket } from "mysql2";
import client from "../../database/client.js";

export const findCoachByEmail = async (email: string) => {
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT * FROM COACH WHERE EMAIL = ?",
		[email],
	);
	return rows[0] as RowDataPacket | undefined;
};

export const findEleveByEmail = async (email: string) => {
	const [rows] = await client.query<RowDataPacket[]>(
		"SELECT * FROM ELEVES WHERE EMAIL = ?",
		[email],
	);
	return rows[0] as RowDataPacket | undefined;
};
