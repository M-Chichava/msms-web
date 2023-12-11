import {Transaction} from "../../../models/transaction";


export interface TransactionState {
    transactions: Transaction[];
    transaction: Transaction | null;
    error: string | null;
}

const initialTransactionState: TransactionState = {
    transactions: [],
    transaction: null,
    error: null,
};

export default initialTransactionState;