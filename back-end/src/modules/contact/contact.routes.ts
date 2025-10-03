import { Router } from "express";
import { ContactController } from "./contact.controller";

const router = Router();
const contactController = new ContactController();

// POST /api/contact - Submit a new contact form
router.post("/", contactController.submitContactForm.bind(contactController));

// GET /api/contact - Get all contact submissions (for admin) with pagination and filtering
router.get(
	"/",
	contactController.getContactSubmissions.bind(contactController)
);

// GET /api/contact/search - Search contact submissions
router.get("/search", contactController.searchContacts.bind(contactController));

// GET /api/contact/stats - Get contact statistics
router.get("/stats", contactController.getContactStats.bind(contactController));

// GET /api/contact/:id - Get a specific contact submission by ID
router.get(
	"/:id",
	contactController.getContactSubmissionById.bind(contactController)
);

// PUT /api/contact/:id/status - Update contact status
router.put(
	"/:id/status",
	contactController.updateContactStatus.bind(contactController)
);

// DELETE /api/contact/:id - Delete a contact submission
router.delete("/:id", contactController.deleteContact.bind(contactController));

export default router;
