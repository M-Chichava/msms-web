import initialLoanState from "../../actions/loans/state";
import {actionType} from "../../actions/loans/types";

export const loanReducer = (state = initialLoanState, action: actionType) => {
    switch (action.type) {

        case actionType.add:
            return {
                ...state,
                loans: [...state.loans, action.payload],
                error: null,
            };

        case actionType.add + '_ERROR':
            return {
                ...state,
                error: action.error,
            };

        // Handle fetching loans
        case actionType.fetch:
            return {
                ...state,
                loans: action.payload,
                error: null,
            };

        case actionType.fetch + '_ERROR':
            return {
                ...state,
                error: action.error,
            };

        // Handle getting a loan
        case actionType.get:
            return {
                ...state,
                loan: action.payload,
                error: null,
            };

        case actionType.get + '_ERROR':
            return {
                ...state,
                error: action.error,
            };

        // Handle updating a loan
        case actionType.update:
            // Find the index of the updated loan in the array
            const updatedLoanIndex = state.loans.findIndex((c) => c.id === action.payload.id);

            // Create a copy of the loans array with the updated loan
            const updatedLoans = [...state.loans];
            updatedLoans[updatedLoanIndex] = action.payload;

            return {
                ...state,
                loans: updatedLoans,
                error: null,
            };

        case actionType.update + '_ERROR':
            return {
                ...state,
                error: action.error,
            };

        case actionType.delete:
            const filteredLoans = state.loans.filter((c) => c.id !== action.payload);

            return {
                ...state,
                loans: filteredLoans,
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
