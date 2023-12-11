import {actionType} from "./types";
import {Customer} from "../../../models/customer";
import {Dispatch} from "redux";
import {DebtorCustomer} from "../../../models/debtorCustomer";

export const addCustomerSuccess = (customer: Customer) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.add,
        payload: customer,
    });
};

export const addCustomerError = (error: string) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.add,
        error,
    });
};

export const fetchCustomersSuccess = (customers: Customer[]) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.fetch,
        payload: customers,
    });
};

export const fetchCustomersError = (error: string) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.fetch,
        error,
    });
};


export const getCustomerSuccess = (customer: Customer) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.get,
        payload: customer,
    });
};

export const getCustomerError = (error: string) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.get,
        error,
    });
};

export const getActiveCustomerSuccess = (debtorCustomers: DebtorCustomer[]) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.debtor,
        payload: debtorCustomers,
    });
};

export const getActiveCustomerError = (error: string) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.debtor,
        error,
    });
};


export const updateCustomerSuccess = (customer: Customer) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.update,
        payload: customer,
    });
};

export const updateCustomerError = (error: string) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.update,
        error,
    });
};

// Action creators for deleting a customer
export const deleteCustomerSuccess = (customerId: string) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.delete,
        payload: customerId,
    });
};

export const deleteCustomerError = (error: string) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.delete,
        error,
    });
};