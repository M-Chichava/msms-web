import {MaritalStatus} from "./maritalStatus";

import { Nuit} from './nuit'
import {IdDocument} from "./idDocument";

export interface DebtorCustomer {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    associatedLoan: string;
    maritalStatus: MaritalStatus;
    idDocument: IdDocument;
    nuit: Nuit;
    totalLoans: number
}