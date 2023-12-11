import initialPaymentState from "../../actions/payments/state";
import {actionType} from "../../actions/payments/types";

export const paymentReducer = (state = initialPaymentState, action: actionType) => {
    switch (action.type) {

        case actionType.add:
            return {
                ...state,
                payments: [...state.payments, action.payload],
                error: null,
            };

        case actionType.add + '_ERROR':
            return {
                ...state,
                error: action.error,
            };

        // Handle fetching payments
        case actionType.fetch:
            return {
                ...state,
                payments: action.payload,
                error: null,
            };

        case actionType.fetch + '_ERROR':
            return {
                ...state,
                error: action.error,
            };

        // Handle getting a payment
        case actionType.get:
            return {
                ...state,
                payment: action.payload,
                error: null,
            };

        case actionType.get + '_ERROR':
            return {
                ...state,
                error: action.error,
            };

        // Handle updating a payment
        case actionType.update:
            // Find the index of the updated payment in the array
            const updatedPaymentIndex = state.payments.findIndex((c) => c.id === action.payload.id);

            // Create a copy of the payments array with the updated payment
            const updatedPayments = [...state.payments];
            updatedPayments[updatedPaymentIndex] = action.payload;

            return {
                ...state,
                payments: updatedPayments,
                error: null,
            };

        case actionType.update + '_ERROR':
            return {
                ...state,
                error: action.error,
            };

        case actionType.delete:
            const filteredPayments = state.payments.filter((c) => c.id !== action.payload);

            return {
                ...state,
                payments: filteredPayments,
                error: null,
            };

        case actionType.delete + '_ERROR':
            return {
                ...state,
                error: action.error,
            };

        default:
            return state;
    }
};
