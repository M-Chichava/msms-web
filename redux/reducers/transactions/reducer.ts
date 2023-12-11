import initialTransactionState from "../../actions/transactions/state";
import {actionType} from "../../actions/transactions/types";

export const transactionReducer = (state = initialTransactionState, action: actionType) => {
    switch (action.type) {

        case actionType.add:
            return {
                ...state,
                transactions: [...state.transactions, action.payload],
                error: null,
            };

        case actionType.add + '_ERROR':
            return {
                ...state,
                error: action.error,
            };

        // Handle fetching transactions
        case actionType.fetch:
            return {
                ...state,
                transactions: action.payload,
                error: null,
            };

        case actionType.fetch + '_ERROR':
            return {
                ...state,
                error: action.error,
            };

        // Handle getting a transaction
        case actionType.get:
            return {
                ...state,
                transaction: action.payload,
                error: null,
            };

        case actionType.get + '_ERROR':
            return {
                ...state,
                error: action.error,
            };

        // Handle updating a transaction
        case actionType.update:
            // Find the index of the updated transaction in the array
            const updatedTransactionIndex = state.transactions.findIndex((c) => c.id === action.payload.id);

            // Create a copy of the transactions array with the updated transaction
            const updatedTransactions = [...state.transactions];
            updatedTransactions[updatedTransactionIndex] = action.payload;

            return {
                ...state,
                transactions: updatedTransactions,
                error: null,
            };

        case actionType.update + '_ERROR':
            return {
                ...state,
                error: action.error,
            };

        case actionType.delete:
            const filteredTransactions = state.transactions.filter((c) => c.id !== action.payload);

            return {
                ...state,
                transactions: filteredTransactions,
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
