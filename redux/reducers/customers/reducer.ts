import initialCustomerState from "../../actions/customers/state";
import {actionType} from "../../actions/customers/types";

export const customerReducer = (state = initialCustomerState, action: actionType) => {
    switch (action.type) {
        // Handle adding a customer
        case actionType.add:
            return {
                ...state,
                customers: [...state.customers, action.payload],
                error: null,
            };

        case actionType.add + '_ERROR':
            return {
                ...state,
                error: action.error,
            };

        // Handle fetching customers
        case actionType.fetch:
            return {
                ...state,
                customers: action.payload,
                error: null,
            };

        case actionType.fetch + '_ERROR':
            return {
                ...state,
                error: action.error,
            };

        // Handle getting customers with active loan
        case actionType.debtor:
            return {
                ...state,
                debtorCustomers: [...state.debtorCustomers, action.payload],
                error: null
            };

        case actionType.debtor + '_ERROR':
            return {
                ...state,
                error: action.error,
            };

        // Handle getting a customer
        case actionType.get:
            return {
                ...state,
                customer: action.payload,
                error: null,
            };

        case actionType.get + '_ERROR':
            return {
                ...state,
                error: action.error,
            };

        // Handle updating a customer
        case actionType.update:
            // Find the index of the updated customer in the array
            const updatedCustomerIndex = state.customers.findIndex((c) => c.id === action.payload.id);

            // Create a copy of the customers array with the updated customer
            const updatedCustomers = [...state.customers];
            updatedCustomers[updatedCustomerIndex] = action.payload;

            return {
                ...state,
                customers: updatedCustomers,
                error: null,
            };

        case actionType.update + '_ERROR':
            return {
                ...state,
                error: action.error,
            };

        // Handle deleting a customer
        case actionType.delete:
            // Filter out the deleted customer from the array
            const filteredCustomers = state.customers.filter((c) => c.id !== action.payload);

            return {
                ...state,
                customers: filteredCustomers,
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
