import {actionType} from "./types";
import {Dispatch} from "redux";
import {Payment} from "../../../models/payment";

export const addPaymentSuccess = (payment: Payment) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.add,
        payload: payment,
    });
};

export const addPaymentError = (error: string) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.add,
        error,
    });
};

export const fetchPaymentsSuccess = (payments: Payment[]) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.fetch,
        payload: payments,
    });
};

export const fetchPaymentsError = (error: string) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.fetch,
        error,
    });
};


export const getPaymentSuccess = (payment: Payment) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.get,
        payload: payment,
    });
};

export const getPaymentError = (error: string) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.get,
        error,
    });
};


export const updatePaymentSuccess = (payment: Payment) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.update,
        payload: payment,
    });
};

export const updatePaymentError = (error: string) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.update,
        error,
    });
};

export const deletePaymentSuccess = (paymentId: number) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.delete,
        payload: paymentId,
    });
};

export const deletePaymentError = (error: string) => (dispatch: Dispatch<actionType>) => {
    dispatch({
        type: actionType.delete,
        error,
    });
};