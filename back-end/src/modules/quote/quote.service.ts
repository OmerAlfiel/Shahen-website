import {
	QuoteRequest,
	QuoteResponseData,
	QuoteBreakdownItem,
} from "../../types";

// Simple pricing logic for MVP. This can be replaced with distance-based pricing later.
export class QuoteService {
	estimateQuote(payload: QuoteRequest): QuoteResponseData {
		const breakdown: QuoteBreakdownItem[] = [];

		// Base price by truck type (heuristic via label)
		const label = payload.truckLabel.toLowerCase();
		let basePerTruck = 120;
		if (
			label.includes("دينا") ||
			label.includes("dina") ||
			label.includes("diana")
		)
			basePerTruck = 120;
		if (label.includes("لوري") || label.includes("lorry")) basePerTruck = 180;
		if (
			label.includes("سطحة") ||
			label.includes("سطحه") ||
			label.includes("flat") ||
			label.includes("trailer") ||
			label.includes("تريلا")
		)
			basePerTruck = 300;
		if (label.includes("قلاب") || label.includes("dumper"))
			basePerTruck = Math.max(basePerTruck, 260);

		const qty = Math.max(1, Math.min(payload.quantity || 1, 99));
		const base = basePerTruck * qty;
		breakdown.push({
			label: `Base fare (${qty} truck${qty > 1 ? "s" : ""})`,
			amount: base,
		});

		// Additional stop fee if multiple deliveries
		if (payload.deliveryType === "multiple") {
			breakdown.push({ label: "Additional drop-off", amount: 50 });
		}

		// Time slot surcharge (evening slots cost a bit more)
		const time = (payload.timeLabel || "").toLowerCase();
		if (
			time.includes("6:00 pm") ||
			time.includes("8:00 pm") ||
			time.includes("pm")
		) {
			breakdown.push({ label: "Evening time surcharge", amount: 30 });
		}

		// Load handling surcharge for special types
		const lt = (payload.loadType || "").toLowerCase();
		if (
			lt.includes("مواد بناء") ||
			lt.includes("construction") ||
			lt.includes("building")
		) {
			breakdown.push({ label: "Heavy load handling", amount: 40 });
		}
		if (lt.includes("مواد غذائية") || lt.includes("food")) {
			breakdown.push({ label: "Perishable handling", amount: 20 });
		}

		// Insurance (1% of declared value, capped at 200 SAR)
		const insuranceValue = Math.max(0, payload.insuranceValue || 0);
		if (insuranceValue > 0) {
			const insuranceFee = Math.min(200, Math.round(insuranceValue * 0.01));
			breakdown.push({ label: "Insurance", amount: insuranceFee });
		}

		const estimate = breakdown.reduce((sum, item) => sum + item.amount, 0);

		return {
			estimate,
			currency: "SAR",
			breakdown,
			etaMinutes: 10, // TODO: calculate ETA based on distance
		};
	}
}
