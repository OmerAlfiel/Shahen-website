import { Request, Response } from "express";
import { QuoteRequest } from "../../types";
import { sendError, sendSuccess } from "../../utils/response";
import { QuoteService } from "./quote.service";

export class QuoteController {
	private service: QuoteService;

	constructor() {
		this.service = new QuoteService();
	}

	public getQuote = (req: Request, res: Response) => {
		try {
			const body = req.body as Partial<QuoteRequest>;

			// Basic validation
			const errors: string[] = [];
			if (
				!body.deliveryType ||
				!["single", "multiple"].includes(body.deliveryType)
			) {
				errors.push("deliveryType must be 'single' or 'multiple'");
			}
			if (!body.pickupLocation) errors.push("pickupLocation is required");
			if (!body.dropLocation1) errors.push("dropLocation1 is required");
			if (body.deliveryType === "multiple" && !body.dropLocation2) {
				errors.push("dropLocation2 is required for 'multiple' deliveryType");
			}
			if (!body.truckLabel) errors.push("truckLabel is required");
			if (!body.dateISO) errors.push("dateISO is required");
			if (!body.timeLabel) errors.push("timeLabel is required");
			if (!body.loadType) errors.push("loadType is required");

			if (errors.length) {
				return sendError(res, "Validation failed", 400, errors.join("; "));
			}

			const payload: QuoteRequest = {
				deliveryType: body.deliveryType!,
				pickupLocation: body.pickupLocation!,
				dropLocation1: body.dropLocation1!,
				dropLocation2: body.dropLocation2,
				truckLabel: body.truckLabel!,
				quantity: Math.max(1, Math.min(Number(body.quantity ?? 1), 99)),
				dateISO: body.dateISO!,
				timeLabel: body.timeLabel!,
				loadType: body.loadType!,
				loadQuantity: body.loadQuantity ? Number(body.loadQuantity) : undefined,
				loadExact: body.loadExact,
				insuranceValue: body.insuranceValue
					? Number(body.insuranceValue)
					: undefined,
				language: body.language === "ar" ? "ar" : "en",
			};

			const result = this.service.estimateQuote(payload);
			return sendSuccess(res, "Quote estimated successfully", result, 200);
		} catch (error) {
			return sendError(
				res,
				"Failed to estimate quote",
				500,
				error instanceof Error ? error.message : String(error)
			);
		}
	};
}
