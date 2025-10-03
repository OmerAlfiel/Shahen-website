import { Router } from "express";
import { contactController } from "./contact.controller";

const router = Router();

// POST /api/contact - Submit a new contact form
router.post("/", contactController.submitContactForm);

// GET /api/contact - Get all contact submissions (for admin)
router.get("/", contactController.getContactSubmissions);

// GET /api/contact/:id - Get a specific contact submission by ID
router.get("/:id", contactController.getContactSubmissionById);

export default router;
