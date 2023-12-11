import {
    addLoanError,
    addLoanSuccess, deleteLoanError,
    deleteLoanSuccess,
    fetchLoansError, fetchLoansSuccess,
    getLoanError, getLoanSuccess,
    updateLoanError,
    updateLoanSuccess
} from "./loans/creators";

import {
    addCustomerError,
    addCustomerSuccess, deleteCustomerError, deleteCustomerSuccess,
    fetchCustomersError, fetchCustomersSuccess,getActiveCustomerSuccess,getActiveCustomerError, getCustomerError, getCustomerSuccess,
    updateCustomerError,
    updateCustomerSuccess
} from "./customers/creators";
import {
    deleteUserError,
    deleteUserSuccess,
    loginError,
    loginSuccess,
    logoutError,
    logoutSuccess,
    registerError,
    registerSuccess, resetPasswordError,
    resetPasswordSuccess, updatePasswordError, updatePasswordSuccess, updateProfileError, updateProfileSuccess
} from "./auth/creators";
import {
    addTransactionError,
    addTransactionSuccess, deleteTransactionError, deleteTransactionSuccess,
    fetchTransactionsError,
    fetchTransactionsSuccess,
    getTransactionError,
    getTransactionSuccess,
    updateTransactionError,
    updateTransactionSuccess
} from "./transactions/creators";
import {
    addPaymentError,
    addPaymentSuccess, deletePaymentError, deletePaymentSuccess,
    fetchPaymentsError,
    fetchPaymentsSuccess, getPaymentError, getPaymentSuccess, updatePaymentError,
    updatePaymentSuccess
} from "./payments/creators";

export default {
    addCustomerError,
    addCustomerSuccess,
    deleteCustomerError,
    deleteCustomerSuccess,
    fetchCustomersError,
    fetchCustomersSuccess,
    updateCustomerError,
    updateCustomerSuccess,
    getCustomerError,
    getActiveCustomerError,
    getActiveCustomerSuccess,
    getCustomerSuccess,
    addLoanError,
    addLoanSuccess,
    deleteLoanError,
    deleteLoanSuccess,
    fetchLoansError,
    fetchLoansSuccess,
    updateLoanError,
    updateLoanSuccess,
    getLoanError,
    getLoanSuccess,
    loginSuccess,
    loginError,
    logoutSuccess,
    logoutError,
    registerSuccess,
    registerError,
    resetPasswordSuccess,
    resetPasswordError,
    updatePasswordSuccess,
    updatePasswordError,
    updateProfileSuccess,
    updateProfileError,
    deleteUserSuccess,
    deleteUserError,
    addTransactionSuccess,
    addTransactionError,
    fetchTransactionsSuccess,
    fetchTransactionsError,
    getTransactionSuccess,
    getTransactionError,
    updateTransactionSuccess,
    updateTransactionError,
    deleteTransactionSuccess,
    deleteTransactionError,
    addPaymentSuccess,
    addPaymentError,
    fetchPaymentsSuccess,
    fetchPaymentsError,
    getPaymentSuccess,
    getPaymentError,
    updatePaymentSuccess,
    updatePaymentError,
    deletePaymentSuccess,
    deletePaymentError
}