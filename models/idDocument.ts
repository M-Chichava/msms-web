import {DocumentType} from "./documentType";

export interface IdDocument {
    id: number;
    documentType: DocumentType;
    number: string;
    placeOfIssue: string;
    expirationDate: Date;
    issueDate: Date;
    nationality: string;
    naturalness: string;
    birthDate: Date
}