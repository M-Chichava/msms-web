import {actionType} from "./types";
import {Dispatch} from "redux";
import {Loan} from "../../../models/loan";

export const addLoanSuccess = (loan: Loan) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.add,
        payload: loan,
    });
};

export const addLoanError = (error: string) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.add,
        error,
    });
};

export const fetchLoansSuccess = (loans: Loan[]) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.fetch,
        payload: loans,
    });
};

export const fetchLoansError = (error: string) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.fetch,
        error,
    });
};


export const getLoanSuccess = (loan: Loan) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.get,
        payload: loan,
    });
};

export const getLoanError = (error: string) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.get,
        error,
    });
};


export const updateLoanSuccess = (loan: Loan) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.update,
        payload: loan,
    });
};

export const updateLoanError = (error: string) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.update,
        error,
    });
};

export const deleteLoanSuccess = (loanId: string) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.delete,
        payload: loanId,
    });
};

export const deleteLoanError = (error: string) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.delete,
        error,
    });
};