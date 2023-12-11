import {Payment} from "../../../models/payment";


export interface PaymentState {
    payments: Payment[];
    payment: Payment | null;
    error: string | null;
}

const initialPaymentState: PaymentState = {
    payments: [],
    payment: null,
    error: null,
};

export default initialPaymentState;