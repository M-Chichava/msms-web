import {Loan} from "../../../models/loan";


export interface LoanState {
    loans: Loan[];
    loan: Loan | null;
    error: string | null;
}

const initialLoanState: LoanState = {
    loans: [],
    loan: null,
    error: null,
};

export default initialLoanState;