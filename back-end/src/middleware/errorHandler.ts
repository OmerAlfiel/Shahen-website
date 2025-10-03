import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types";

export const errorHandler = (
	error: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
): void => {
	console.error("Error occurred:", error);

	const response: ApiResponse = {
		status: "error",
		message: "Internal server error",
		...(process.env.NODE_ENV === "development" && { error: error.message }),
	};

	res.status(500).json(response);
};
