import React, {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers';
import {decryptWithBuffer, useAppDispatch} from '../../../api/config/config';
import { getLoan } from '../../../redux/effects/loans/effects';
import { useRouter } from 'next/router';
import {Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Admin from "../../../layouts/Admin";
import PageChange from "../../../components/PageChange/PageChange";
import {fetchCustomers} from "../../../redux/effects/customers/effects";

const NLoan: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const loanData = useSelector((state: RootState) => state.loans.loan);
    const [loading, setLoading] = useState(true);

    const { nLoan } = router.query

    const realId = decryptWithBuffer(nLoan)

    React.useEffect(() => {
        const delay = setTimeout(()=> {
            dispatch(fetchCustomers());
        if (typeof nLoan == "string"){
            dispatch(getLoan(realId));
        }
        setLoading(false);
    }, 2000);

    return () => clearTimeout(delay);

}, [dispatch, nLoan]);


    const formatCurrency = (amount) => {

        if (amount) {
        const formattedAmount = amount.toFixed(2);

        const [integerPart, decimalPart] = formattedAmount.split('.');

        const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        const formattedCurrency = `${integerWithCommas}.${decimalPart}`;
 return `${formattedCurrency} MZN`
        }
        else {
            const formattedCurrency = `${0}.${0}`;
            return `${formattedCurrency} MZN`;
        }


    }

    const sortedPaymentList = loanData?.paymentList
        ? [...loanData.paymentList].sort((a, b) => {
            // Convert the date strings to Date objects for comparison
            const dateA = new Date(a.paymentDate);
            const dateB = new Date(b.paymentDate);

            // Compare the dates in descending order
            return dateB - dateA;
        })
        : [];

    const renderDetail = (label: string, value: string | number | undefined) => {
        return (
            <Typography variant="body1">
                <strong className="text-md">{label}:</strong>{' '}
                {loanData ? (
                    value
                ) : (
                    <Skeleton variant="text" width={400} height={60} animation="pulse" />
                )}
            </Typography>
        );
    };
    const renderTable = (
        header: string[],
        data: { [key: string]: string | number }[],
    ) => {
        return (
            <TableContainer component={Paper!}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="customized  table">
                    <TableHead>
                        <TableRow>
                            {header.map((column) => (
                                <TableCell  key={column}>{column}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {header.map((column) => (
                                    <TableCell key={column}>{row[column]}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };
    return (
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            { loading ? (
                <PageChange/>
            ) : (

                <div className="rounded-t mb-0   border-0">
                <div className="flex p-4 flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right flex flex-row justify-end  items-center">
                                        <span className="text-sm font-bold px-4" style={{color: loanData?.status == "Activo" ? '#f10000' : '#338d00'}}>
                                            {loanData?.status}
                                        </span>
                <div
                    style={{backgroundColor: loanData?.status == "Activo" ? '#f10000' : '#338d00',
                        borderRadius: '50%',
                        width: '2em',
                        height: '2em',
                    }}
                    className="flex justify-center items-center"
                >
                </div>
            </div>
                                <Typography variant="h6">Detalhes do Empréstimo</Typography>
                                <div className=" px-12  pt-12 min-w-48 min-h-screen-25 ">
                                    <Divider textAlign="center" className="pb-6">DADOS PESSOAIS E CONTACTO</Divider>
                                    <div className="relative w-full flex flex-row py-2 gap-6 pr-4 max-w-full flex-grow flex-1">
                                        <div className="relative w-full pr-4  max-w-full flex-grow flex-1">
                                            {renderDetail('Nome Completo', loanData?.fullName)}
                                        </div>
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            {renderDetail('Número de Telefone', loanData?.phoneNumber)}
                                        </div>
                                    </div>

                                    <div className="relative w-full flex flex-row gap-6 pr-4 py-2 max-w-full flex-grow flex-1">
                                        <div className="relative w-full pr-4  max-w-full flex-grow flex-1">
                                            {renderDetail('Estado Civil', loanData?.maritalStatus)}
                                        </div>
                                        <div className="relative w-full pr-4  max-w-full flex-grow flex-1">
                                            {renderDetail('NUIT', loanData?.nuit)}
                                        </div>
                                    </div>
                                    <div className="relative w-full flex flex-row gap-6 pr-4 py-2 max-w-full flex-grow flex-1">
                                        <div className="relative w-full pr-4  max-w-full flex-grow flex-1">
                                            {renderDetail('Tipo de Documento', loanData?.documentType)}
                                        </div>
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            {renderDetail('Número de Documento', loanData?.documentNumber)}
                                        </div>
                                    </div>
                                    <Divider textAlign="center" className="py-8">DADOS DO EMPRÉSTIMO</Divider>
                                    <div className="relative w-full flex flex-row gap-6 pr-4 py-2 max-w-full flex-grow flex-1">
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            {renderDetail('ID do Empréstimo', loanData?.nLoan)}
                                        </div>
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            {renderDetail('Crédito',  formatCurrency(loanData?.credit))}
                                        </div>
                                    </div>
                                    <div className="relative w-full flex flex-row gap-6 pr-4 py-2 max-w-full flex-grow flex-1">
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            {renderDetail('Valor', formatCurrency(loanData?.amount))}
                                        </div>
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            {renderDetail('Taxa de Juros', `${loanData?.interestRate * 100}%`)}
                                        </div>
                                    </div>
                                    <div className="relative w-full flex flex-row gap-6 pr-4 py-2 max-w-full flex-grow flex-1">
                                        <div className="relative w-full pr-4  max-w-full flex-grow flex-1">
                                            {renderDetail('Número de Meses', loanData?.numberOfMonths)}
                                        </div>
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            {renderDetail('Criado Em', new Date(loanData?.createdAt).toLocaleDateString('pt-BR'))}
                                        </div>
                                    </div>
                                    <div className="relative w-full flex flex-row gap-6 pr-4 py-2 max-w-full flex-grow flex-1">

                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            {renderDetail('Modalidade de Pagamento', loanData?.paymentModality)}
                                        </div>
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            {renderDetail('Saldo Restante', formatCurrency(loanData?.remainingBalance))}
                                        </div>
                                    </div>
                                    <div className="relative w-full flex flex-row gap-6 pr-4 py-2 max-w-full flex-grow flex-1">
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            {renderDetail('Total Pago', formatCurrency(loanData?.totalPaid))}
                                        </div>
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            {renderDetail('Amortização', formatCurrency(loanData?.amortization))}
                                        </div>
                                    </div>
                                    <div className="relative w-full flex flex-row gap-6 pr-4 py-2 max-w-full flex-grow flex-1">
                                        <div className="relative w-full pr-4  max-w-full flex-grow flex-1">
                                            {renderDetail('Assistente', loanData?.assistant)}
                                        </div>

                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        </div>
                                    </div>

                                    <Divider textAlign="center" className="py-8">ENDEREÇO</Divider>
                                    <div className="relative w-full flex flex-row gap-6 pr-4 py-2 max-w-full flex-grow flex-1">
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            {renderDetail('Rua', loanData?.street)}
                                        </div>
                                        <div className="relative w-full pr-4  max-w-full flex-grow flex-1">
                                            {renderDetail('Localidade', loanData?.place)}
                                        </div>
                                    </div>
                                    <div className="relative w-full flex flex-row gap-6 pr-4 py-2 max-w-full flex-grow flex-1">
                                        <div className="relative w-full pr-4  max-w-full flex-grow flex-1">
                                            {renderDetail('Cidade', loanData?.city)}
                                        </div>
                                        <div className="relative w-full pr-4  max-w-full flex-grow flex-1">
                                            {renderDetail('Bloco', loanData?.block)}
                                        </div>
                                    </div>
                                    <div className="relative w-full flex flex-row gap-6 pr-4 py-2 max-w-full flex-grow flex-1">
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            {renderDetail('Bairro', loanData?.neighborhood)}
                                        </div>
                                    </div>
                            <Divider textAlign="center" className="py-8">GARANTIAS BACARIAS</Divider>
                                {loanData?.bankGuaranteeList ? (
                                    renderTable(
                                        ['Descricao', 'Valor'],
                                        loanData.bankGuaranteeList.map((guarantee) => ({
                                            Descricao: guarantee.description,
                                            Valor: formatCurrency(guarantee.amount),
                                        })),
                                    )
                                ) : (
                                    <Skeleton variant="rectangular" height={100} animation="wave" />
                                )}
                            <Divider textAlign="center" className="py-8">PAGAMENTOS</Divider>
                            {loanData?.paymentList ? (
                                renderTable(
                                    ['Descricao', 'Valor Pago', 'Data do Pagamento', 'Saldo Restante'],
                                    loanData.paymentList.map((payment) => ({
                                        Descricao: payment.description,
                                        'Valor Pago': formatCurrency(payment.amountPaid),
                                        'Data do Pagamento': payment.paymentDate
                                            ? new Date(payment.paymentDate).toLocaleDateString('pt-BR')
                                            : '',
                                        'Saldo Restante': formatCurrency(payment.remainingBalance)

                                    })),
                                )
                            ) : (
                                <Skeleton variant="rectangular" height={100} animation="wave" />
                            )}
                                </div>
                        </Paper>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};
NLoan.layout = Admin
export default NLoan;
