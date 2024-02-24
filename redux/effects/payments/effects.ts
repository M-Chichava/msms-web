import { addPaymentError } from '../../actions/payments/creators';
import { Dispatch } from 'redux';
import axios from 'axios';
import { actionType } from "../../actions/payments/types";
import {API_URL} from "../../../api/config/config";
import {Payment} from "../../../models/payment";
import {
    addPaymentSuccess,
    deletePaymentSuccess,
    fetchPaymentsSuccess, getPaymentSuccess,
    updatePaymentSuccess
} from "../../actions/payments/creators";


// Efeito para buscar a lista de pagamentos
export const fetchPayments = () => async (dispatch: Dispatch<actionType>) => {
    try {
        const response = await axios.get(`${API_URL}/payments/list`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                'Content-Type': 'application/json'
            }
        });
        const payments: Payment[] = response.data;
        dispatch(fetchPaymentsSuccess(payments));
    } catch (error) {
        // Trate os erros de forma apropriada
    }
};

// Efeito para buscar um pagamento específico pelo ID
export const getPayment = (paymentId: number) => async (dispatch: Dispatch<actionType>) => {
    try {
        const response = await axios.get(`${API_URL}/payments/${paymentId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                'Content-Type': 'application/json'
            }
        });
        const payment: Payment = response.data;
        dispatch(getPaymentSuccess(payment));
    } catch (error) {
        // Trate os erros de forma apropriada
    }
};

// Efeito para adicionar um novo pagamento
export const addPayment = (formData: any) => async (dispatch: Dispatch<actionType>) => {
    try {
        const response = await axios.post(`${API_URL}/payments/add`, formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                'Content-Type': 'application/json'
            }
        });
        const addedPayment: Payment = response.data;
        dispatch(addPaymentSuccess(addedPayment));
        return response;
    } catch (error) {
        if (error.isAxiosError && error.response) {
            const status = error.response.data.statusCode;
            switch (status) {
                case 400:
                    dispatch(addPaymentError('Bad Request'));
                    break;
                case 404:
                    dispatch(addPaymentError('Not Found'));
                    break;
                case 500:
                    dispatch(addPaymentError('Internal Server Error'));
                    break;
                default:
                    dispatch(addPaymentError('An error occurred'));
            }
        } else {
            dispatch(addPaymentError('Network Error'));
        }
        return error
    }
};

// Efeito para atualizar um pagamento
export const updatePayment = (updatedPayment: Payment) => async (dispatch: Dispatch<actionType>) => {
    try {
        const response = await axios.put(`${API_URL}/payments/${updatedPayment.id}`, updatedPayment, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                'Content-Type': 'application/json'
            }
        });
        const editedPayment: Payment = response.data;
        dispatch(updatePaymentSuccess(editedPayment));
    } catch (error) {
        // Trate os erros de forma apropriada
    }
};

// Efeito para deletar um pagamento
export const deletePayment = (paymentId: number) => async (dispatch: Dispatch<actionType>) => {
    try {
        await axios.delete(`${API_URL}/payments/${paymentId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                'Content-Type': 'application/json'
            }
        });
        dispatch(deletePaymentSuccess(paymentId));
    } catch (error) {
        // Trate os erros de forma apropriada
    }
};
