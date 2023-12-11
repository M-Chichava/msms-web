import React from 'react';
import Admin from "../../../layouts/Admin";

interface CustomerDetailsProps {
    customer: {
        fullName: string;
        email: string;
        phoneNumber: string;
        maritalStatus: string;
        nuit: string;
        documentType: string;
        idNumber: string;
        placeOfIssue: string;
        expirationDate: Date | null;
        issueDate: Date | null;
        nationality: string;
        naturalness: string;
        birthDay: Date | null;
        street: string;
        place: string;
        city: string;
        block: string;
        neighborhood: string;
    };
}

const IdClient: React.FC<CustomerDetailsProps> = ({ customer }) => {
    return (
        <div>
            <h2>Customer Details</h2>
            <p>
                <strong>Full Name:</strong> {customer.fullName}
            </p>
            <p>
                <strong>Email:</strong> {customer.email}
            </p>
            <p>
                <strong>Phone Number:</strong> {customer.phoneNumber}
            </p>
            <p>
                <strong>Marital Status:</strong> {customer.maritalStatus}
            </p>
            <p>
                <strong>NUIT:</strong> {customer.nuit}
            </p>
            <p>
                <strong>Document Type:</strong> {customer.documentType}
            </p>
            <p>
                <strong>ID Number:</strong> {customer.idNumber}
            </p>
            <p>
                <strong>Place of Issue:</strong> {customer.placeOfIssue}
            </p>
            <p>
                <strong>Expiration Date:</strong> {customer.expirationDate || 'N/A'}
            </p>
            <p>
                <strong>Issue Date:</strong> {customer.issueDate || 'N/A'}
            </p>
            <p>
                <strong>Nationality:</strong> {customer.nationality}
            </p>
            <p>
                <strong>Naturalness:</strong> {customer.naturalness}
            </p>
            <p>
                <strong>Birth Day:</strong> {customer.birthDay || 'N/A'}
            </p>
            <p>
                <strong>Street:</strong> {customer.street}
            </p>
            <p>
                <strong>Place:</strong> {customer.place}
            </p>
            <p>
                <strong>City:</strong> {customer.city}
            </p>
            <p>
                <strong>Block:</strong> {customer.block}
            </p>
            <p>
                <strong>Neighborhood:</strong> {customer.neighborhood}
            </p>
        </div>
    );
};

IdClient.layout = Admin
export default IdClient;
