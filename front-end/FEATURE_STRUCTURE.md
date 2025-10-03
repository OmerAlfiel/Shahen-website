# Feature Structure Documentation

## Overview

Each feature in the application follows a unified structure with dedicated API and hook files. This ensures clean separation of concerns and makes the codebase more maintainable.

## Structure Pattern

For each feature (e.g., contact, orders, tracking), create:

### 1. API Service (`src/services/{feature}-api.ts`)

- Contains all API calls related to the feature
- Exports interfaces for request/response data
- Exports a service class and convenience functions
- Handles error management

### 2. Hook (`src/hooks/use-{feature}.ts`)

- Contains React state management for the feature
- Wraps API calls with loading, error, and success states
- Provides convenient methods for the component
- Independent and self-contained

### 3. Component Usage

- Import the hook from `hooks/use-{feature}`
- Use the hook's methods and state in components
- No direct API calls in components

## Example: Contact Feature

### API Service (`src/services/contact-api.ts`)

```typescript
// Interfaces
export interface ContactFormData { ... }
export interface ContactResponse { ... }

// API Class
export class ContactApi { ... }

// Convenience exports
export const contactApi = new ContactApi();
export const submitContactForm = (data: ContactFormData) => contactApi.submitContactForm(data);
```

### Hook (`src/hooks/use-contact.ts`)

```typescript
interface UseContactState {
	data: ContactResponse | null;
	loading: boolean;
	error: Error | null;
	isSuccess: boolean;
	successMessage: string | null;
}

export function useContact(): UseContactReturn {
	// State management
	// API integration
	// Helper methods
}
```

### Component Usage (`src/pages/contact.tsx`)

```typescript
const { submitForm, loading, error, isSuccess, successMessage } = useContact();
```

## Benefits

1. **Separation of Concerns**: API logic separate from UI logic
2. **Reusability**: Hooks can be used across multiple components
3. **Consistency**: All features follow the same pattern
4. **Maintainability**: Easy to find and modify feature-specific code
5. **Testing**: Easy to test API and hooks independently

## Adding New Features

To add a new feature (e.g., "orders"):

1. Create `src/services/orders-api.ts`
2. Create `src/hooks/use-orders.ts`
3. Use in components with `import { useOrders } from "../hooks/use-orders"`

Each feature is completely independent and follows the same unified pattern.
