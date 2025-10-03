import { Response } from "express";
import { ApiResponse } from "../types";

export const sendSuccess = <T>(
	res: Response,
	message: string,
	data?: T,
	statusCode: number = 200
): void => {
	const response: ApiResponse<T> = {
		status: "success",
		message,
		...(data && { data }),
	};

	res.status(statusCode).json(response);
};

export const sendError = (
	res: Response,
	message: string,
	statusCode: number = 400,
	error?: string
): void => {
	const response: ApiResponse = {
		status: "error",
		message,
		...(error && { error }),
	};

	res.status(statusCode).json(response);
};
