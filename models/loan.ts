import {BankGuarantee} from './bankGuarantee.ts'
import {Payment} from "./payment";

export interface Loan {
    id: number;
    nLoan: string;
    status: string;
    fullName: string;
    phoneNumber: string;
    amount: number;
    createdAt: string;
    interestRate: number;
    numberOfMonths: number;
    bankGuaranteeList: BankGuarantee[];
    paymentList: Payment[];
    maritalStatus: string;
    remainingBalance: number;
    totalPaid: number;
    amortization: number;
    credit: number;
    paymentModality: string;
    rate: number;
    requestDate: string;
    documentType: string;
    documentNumber: string;
    nuit: number;
    street: string;
    place: string;
    city: string;
    block: string;
    neighborhood: string;
    assistant: string;
}