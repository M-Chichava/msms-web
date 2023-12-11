import {Customer} from "../../../models/customer";
import {DebtorCustomer} from "../../../models/debtorCustomer";

export interface CustomerState {
    debtorCustomers: DebtorCustomer[];
    customers: Customer[];
    customer: Customer | null;
    error: string | null;
}

const initialCustomerState: CustomerState = {
    debtorCustomers:[],
    customers: [],
    customer: null,
    error: null,
};

export default initialCustomerState;