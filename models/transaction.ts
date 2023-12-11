export interface Transaction {
    id: number;
    timestamp: Date;
    loanId: number;
    loanAmount: number;
    customerName: string;
    customerId: number;
    customerEmail: string;
    customerPhone: string;
    paymentAmount: number;
    paymentMethod: string;
    paymentStatus: string;
    staffId: number;
    staffName: string;
    notes: string;
}
