import {actionType} from "./types";
import {Dispatch} from "redux";
import {Transaction} from "../../../models/transaction";

export const addTransactionSuccess = (transaction: Transaction) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.add,
        payload: transaction,
    });
};

export const addTransactionError = (error: string) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.add,
        error,
    });
};

export const fetchTransactionsSuccess = (transactions: Transaction[]) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.fetch,
        payload: transactions,
    });
};

export const fetchTransactionsError = (error: string) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.fetch,
        error,
    });
};


export const getTransactionSuccess = (transaction: Transaction) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.get,
        payload: transaction,
    });
};

export const getTransactionError = (error: string) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.get,
        error,
    });
};


export const updateTransactionSuccess = (transaction: Transaction) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.update,
        payload: transaction,
    });
};

export const updateTransactionError = (error: string) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.update,
        error,
    });
};

export const deleteTransactionSuccess = (transactionId: string) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.delete,
        payload: transactionId,
    });
};

export const deleteTransactionError = (error: string) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.delete,
        error,
    });
};