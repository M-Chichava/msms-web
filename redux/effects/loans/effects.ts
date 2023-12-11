import { Dispatch } from 'redux';
import { actionType } from '../../actions/loans/types'; // Assuming this is the correct import path
import { Loan } from '../../../models/loan'; // Adjust the import path for your Loan model
import axios from 'axios';
import {API_URL} from "../../../api/config/config";
import {
    addLoanError,
    addLoanSuccess,
    deleteLoanError,
    deleteLoanSuccess, fetchLoansError, fetchLoansSuccess, getLoanError, getLoanSuccess,
    updateLoanError,
    updateLoanSuccess
} from "../../actions/loans/creators";

export const addLoan = (formData: any) => async (dispatch: Dispatch<actionType>) => {
    try {
        const response = await axios.post(`${API_URL}/loans/add`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                'Content-Type': 'application/json',
            },
        });
        const addedLoan: Loan = response.data;
        dispatch(addLoanSuccess(addedLoan));
    } catch (error) {
        if (error.response) {
            const status = error.response.status;
            switch (status) {
                case 400:
                    dispatch(addLoanError('Bad Request'));
                    break;
                case 404:
                    dispatch(addLoanError('Not Found'));
                    break;
                case 500:
                    dispatch(addLoanError('Internal Server Error'));
                    break;
                default:
                    dispatch(addLoanError('An error occurred'));
            }
        } else {
            dispatch(addLoanError('Network Error'));
        }
    }
};

export const fetchLoans = () => async (dispatch: Dispatch<actionType>) => {
    try {
        const response = await axios.get(`${API_URL}/loans/list`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                'Content-Type': 'application/json',
            },
        });
        const loans: Loan[] = response.data;
        dispatch(fetchLoansSuccess(loans));
    } catch (error) {
        if (error.response) {
            const status = error.response.status;
            switch (status) {
                case 400:
                    dispatch(fetchLoansError('Bad Request'));
                    break;
                case 404:
                    dispatch(fetchLoansError('Not Found'));
                    break;
                case 500:
                    dispatch(fetchLoansError('Internal Server Error'));
                    break;
                default:
                    dispatch(fetchLoansError('An error occurred'));
            }
        } else {
            dispatch(fetchLoansError('Network Error'));
        }
    }
};

export const getLoan = (loanId: string) => async (dispatch: Dispatch<actionType>) => {
    try {
        const response = await axios.get(`${API_URL}/loans/get/${loanId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                'Content-Type': 'application/json',
            },
        });
        const loan: Loan = response.data;
        dispatch(getLoanSuccess(loan));
    } catch (error) {
        dispatch(getLoanError('Failed to get loan'));
    }
};


export const updateLoan = (updatedLoan: Loan) => async (dispatch: Dispatch<actionType>) => {
    try {
        const response = await axios.put(`${API_URL}/loans/update/${updatedLoan.nLoan}`, updatedLoan, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                'Content-Type': 'application/json',
            },
        });
        const editedLoan: Loan = response.data;
        dispatch(updateLoanSuccess(editedLoan));
    } catch (error) {
        dispatch(updateLoanError('Failed to update loan'));
    }
};

export const deleteLoan = (loanId: string) => async (dispatch: Dispatch<actionType>) => {
    try {
        // Make the DELETE request to delete the loan
        await axios.delete(`${API_URL}/loans/delete/${loanId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                'Content-Type': 'application/json',
            },
        });
        // Dispatch the success action
        dispatch(deleteLoanSuccess(loanId));
    } catch (error) {
        // Handle any errors and dispatch the error action
        dispatch(deleteLoanError('Failed to delete loan'));
    }
};
