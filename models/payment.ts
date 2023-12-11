import { Loan } from './loan.ts';

export interface Payment {
    id: number;
    description: string;
    amountPaid: number;
    remainingBalance: number;
    paymentDate: Date;
    microcreditLoanId: string;
}