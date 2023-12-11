import React from "react";

interface BankGuarantee {
  id: number;
  amount: number;
  description: string;
}

interface Loan {
  nLoan: string;
  status: string;
  fullName: string;
  phoneNumber: string;
  amount: number;
  createdAt: string;
  interestRate: number;
  numberOfMonths: number;
  bankGuaranteeList: BankGuarantee[];
  maritalStatus: string;
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

interface CardTableProps {
  color?: "light" | "dark";
  loanData: Loan[];
}

const CardTable: React.FC<CardTableProps> = ({ color = "light", loanData }) => {
  return (
      <div
          className={
              "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
              (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
          }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                  className={
                      "font-semibold text-lg " +
                      (color === "light" ? "text-blueGray-700" : "text-white")
                  }
              >
                Loan Data
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
            <tr>
              <th className="...">NLoan</th>
              <th className="...">Cliente</th>
              <th className="...">Montante Solicitado</th>
              <th className="...">Taxa</th>
              <th className="...">Data</th>
              <th className="...">Prestação</th>
              <th className="...">Amortização</th>
              <th className="...">Saldo devedor</th>
              <th className="...">Total Pago</th>
              <th className="...">Total Restante</th>
              <th className="...">Juros Moura</th>
            </tr>
            </thead>
            <tbody>
            {loanData.map((loan) => (
                <tr key={loan.nLoan}>
                  <td>{loan.nLoan}</td>
                  <td>{loan.fullName}</td>
                  <td>{loan.amount}</td>
                  <td>{loan.interestRate}</td>
                  <td>{loan.createdAt}</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
};

CardTable.defaultProps = {
  color: "light",
};

export default CardTable;
