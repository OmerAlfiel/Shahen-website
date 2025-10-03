import { useState, useCallback } from "react";
import {
	ContactFormData,
	ContactResponse,
	submitContactForm as apiSubmitContactForm,
	ApiError,
} from "../services/contact-api";

// Contact hook state interface
interface UseContactState {
	data: ContactResponse | null;
	loading: boolean;
	error: Error | null;
	isSuccess: boolean;
	successMessage: string | null;
}

// Contact hook return interface
interface UseContactReturn extends UseContactState {
	submitForm: (data: ContactFormData) => Promise<ContactResponse>;
	reset: () => void;
	clearSuccess: () => void;
	clearError: () => void;
}

/**
 * Contact feature hook - handles contact form submission with state management
 * Each feature should have its own dedicated hook following this pattern
 */
export function useContact(): UseContactReturn {
	const [state, setState] = useState<UseContactState>({
		data: null,
		loading: false,
		error: null,
		isSuccess: false,
		successMessage: null,
	});

	const submitForm = useCallback(
		async (data: ContactFormData): Promise<ContactResponse> => {
			setState((prev) => ({
				...prev,
				loading: true,
				error: null,
				isSuccess: false,
				successMessage: null,
			}));

			try {
				const response = await apiSubmitContactForm(data);

				setState((prev) => ({
					...prev,
					data: response,
					loading: false,
					isSuccess: true,
					successMessage: response.message || "Message sent successfully!",
				}));

				return response;
			} catch (error) {
				const errorMessage =
					error instanceof ApiError
						? error.message
						: error instanceof Error
						? error.message
						: "An unexpected error occurred";

				setState((prev) => ({
					...prev,
					loading: false,
					error: new Error(errorMessage),
					isSuccess: false,
				}));

				throw error;
			}
		},
		[]
	);

	const reset = useCallback(() => {
		setState({
			data: null,
			loading: false,
			error: null,
			isSuccess: false,
			successMessage: null,
		});
	}, []);

	const clearSuccess = useCallback(() => {
		setState((prev) => ({
			...prev,
			isSuccess: false,
			successMessage: null,
		}));
	}, []);

	const clearError = useCallback(() => {
		setState((prev) => ({
			...prev,
			error: null,
		}));
	}, []);

	return {
		...state,
		submitForm,
		reset,
		clearSuccess,
		clearError,
	};
}
