import { useCallback, useState } from "react";
import { quoteApi } from "../services/quote-api";
import type { QuotePayload, QuoteResponse } from "../services/quote-api";

interface UseQuoteState {
	data: QuoteResponse | null;
	loading: boolean;
	error: Error | null;
	isSuccess: boolean;
}

interface UseQuoteReturn extends UseQuoteState {
	getQuote: (payload: QuotePayload) => Promise<QuoteResponse>;
	reset: () => void;
	clearError: () => void;
}

export function useQuote(): UseQuoteReturn {
	const [state, setState] = useState<UseQuoteState>({
		data: null,
		loading: false,
		error: null,
		isSuccess: false,
	});

	const getQuote = useCallback(async (payload: QuotePayload) => {
		setState((s) => ({ ...s, loading: true, error: null, isSuccess: false }));
		try {
			const res = await quoteApi.estimate(payload);
			setState({ data: res, loading: false, error: null, isSuccess: true });
			return res;
		} catch (err) {
			const e = err instanceof Error ? err : new Error("Failed to get quote");
			setState({ data: null, loading: false, error: e, isSuccess: false });
			throw e;
		}
	}, []);

	const reset = useCallback(() => {
		setState({ data: null, loading: false, error: null, isSuccess: false });
	}, []);

	const clearError = useCallback(() => {
		setState((s) => ({ ...s, error: null }));
	}, []);

	return { ...state, getQuote, reset, clearError };
}
