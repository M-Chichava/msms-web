import { Dispatch } from 'redux';
import { actionType } from '../../actions/customers/types';
import { Customer } from '../../../models/customer'; // Adjust the import path for your Customer model
import axios from 'axios';
import { API_URL } from '../../../api/config/config';
import {
    addCustomerError,
    addCustomerSuccess,
    deleteCustomerError,
    deleteCustomerSuccess,
    fetchCustomersError,
    fetchCustomersSuccess, getActiveCustomerError, getActiveCustomerSuccess,
    updateCustomerError,
    updateCustomerSuccess,
} from '../../actions/customers/creators';
import {DebtorCustomer} from "../../../models/debtorCustomer";

export const addCustomer = (formData: any) => async (dispatch: Dispatch<actionType>) => {
    
    try {
    const response =  await axios.post(`${API_URL}/customers/Create`, formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            'Content-Type': 'application/json',
        },
    });
           
        const addedCustomer: Customer = response.data;
        dispatch(addCustomerSuccess(addedCustomer));

        return response;
    } catch (error) {
        if (error.isAxiosError && error.response) {
            const status = error.response.data.statusCode;
            switch (status) {
                case 400:
                    dispatch(addCustomerError('Bad Request'));
                    break;
                case 404:
                    dispatch(addCustomerError('Not Found'));
                    break;
                case 500:
                    dispatch(addCustomerError('Internal Server Error'));
                    break;
                default:
             
            }
            return error
        } else {
            // Handle other types of errors (e.g., network error)
            console.error('Network error or unexpected issue:', error);
            dispatch(addCustomerError('Network Error'));
        }

        // If an error occurs, you can choose to return null, throw an exception, or handle it as needed.
       
    }
};

export const fetchCustomers = () => async (dispatch: Dispatch<actionType>) => {
    try {
        const response = await axios.get(`${API_URL}/customers/list`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                'Content-Type': 'application/json',
            },
        });
        const customers: Customer[] = response.data;
        dispatch(fetchCustomersSuccess(customers));
    } catch (error) {
        if (error.response) {
            const status = error.response.status;
            switch (status) {
                case 400:
                    dispatch(fetchCustomersError('Bad Request'));
                    break;
                case 404:
                    dispatch(fetchCustomersError('Not Found'));
                    break;
                case 500:
                    dispatch(fetchCustomersError('Internal Server Error'));
                    break;
                default:
                    dispatch(fetchCustomersError('An error occurred'));
            }
        } else {
            dispatch(fetchCustomersError('Network Error'));
        }
    }
};
export const fetchCustomersActiveLoans = () => async (dispatch: Dispatch<actionType>) => {
    try {
        const response = await axios.get(`${API_URL}/customers/activeLoan`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')
                    }`,
                    'Content-Type': 'application/json',
                },
            });
        const debtorCustomers: DebtorCustomer[] = response.data;

        dispatch(getActiveCustomerSuccess(debtorCustomers));

    } catch (error) {
        if (error.response) {
            const status = error.response.status;
            switch (status) {
                case 400:
                    dispatch(getActiveCustomerError('Bad Request'));
                    break;
                case 401:
                    dispatch(getActiveCustomerError('Unauthorized'));
                    break;
                case 404:
                    dispatch(getActiveCustomerError('Not Found'));
                    break;
                case 500:
                    dispatch(getActiveCustomerError('Internal Server Error'));
                    break;
                default:
                    dispatch('Internal Server Error');
            }
        } else {
            dispatch(getActiveCustomerError('Network Error'));
        }
    }
};

export const updateCustomer = (customerId: string, updatedData: any) => async (
    dispatch: Dispatch<actionType>
) => {
    try {
        const response = await axios.put(`${API_URL}/customers/update/${customerId}`, updatedData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                'Content-Type': 'application/json',
            },
        });
        const editedCustomer: Customer = response.data;
        dispatch(updateCustomerSuccess(editedCustomer));
    } catch (error) {
        dispatch(updateCustomerError('Failed to update customer'));
    }
};

export const deleteCustomer = (customerId: string) => async (dispatch: Dispatch<actionType>) => {
    try {
        await axios.delete(`${API_URL}/customers/delete/${customerId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                'Content-Type': 'application/json',
            },
        });
        dispatch(deleteCustomerSuccess(customerId));
    } catch (error) {
        dispatch(deleteCustomerError('Failed to delete customer'));
    }
};
