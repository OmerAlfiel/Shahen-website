import { Router } from "express";
import { QuoteController } from "./quote.controller";

const router = Router();
const controller = new QuoteController();

// POST /api/quote/estimate - Calculate a price estimate for an order
router.post("/estimate", controller.getQuote);

export default router;
