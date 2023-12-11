import { combineReducers } from 'redux'
import {customerReducer} from "./customers/reducer";
import {loanReducer} from "./loans/reducer";
import {authReducer} from "./auth/reducer";
import store from "../store";
import {paymentReducer} from "./payments/reducer";
import {transactionReducer} from "./transactions/reducer";

const rootReducers = combineReducers({
    customers: customerReducer,
    loans: loanReducer,
    auth: authReducer,
    payments: paymentReducer,
    transactions: transactionReducer
})

export default rootReducers

export type RootState = ReturnType<typeof rootReducers>;
export type AppDispatch = typeof store.dispatch