import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLoan } from "../../../../redux/effects/loans/effects";
import { useAppDispatch } from "../../../../api/config/config";
import Admin from "../../../../layouts/Admin";
import ReactQuill from "react-quill";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import CircularProgress from "@mui/material/CircularProgress";

import "react-quill/dist/quill.snow.css";
import {
    Box,
    Button,
    Divider,
    MenuItem,
    Select,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextareaAutosize,
    Typography,
    Autocomplete,
    createFilterOptions,
    Modal,
    DialogTitle,
    DialogActions,
    DialogContentText, DialogContent, Dialog,
    Card,
} from "@mui/material";
import { fetchCustomers } from "../../../../redux/effects/customers/effects";
import { RootState } from "../../../../redux/reducers";
import ProcessingDialog from "../../../../components/Dialog/ProcessingDialog";
import PageChange from "../../../../components/PageChange/PageChange";
import { CheckCircleOutline, Close } from "@mui/icons-material";

const AddLoan: React.FC = () => {

    const [guaranteeDescription, setGuaranteeDescription] = useState("");
    const [guaranteeAmount, setGuaranteeValue] = useState("");
    const [interest, setInterest] = useState(0);
    const [amortization, setAmortization] = useState(0);
    const [credit, setCredit] = useState(0);
    const dispatch = useAppDispatch();
    const [paymentModality, setPaymentModality] = useState<string>('');
    const [interestRate, setInterestRate] = useState<number>(0);
    const customerList = useSelector((state: RootState) => state.customers.customers);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [formFieldsChanged, setFormFieldsChanged] = useState<boolean>(false);
    const [processing, setProcessing] = useState(false);
    const [fetchStatus, setFetchStatus] = useState("processando");
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false);
    const [showCard, setShowCard] = useState(false);

    const [formData, setFormData] = useState({
        customerId: 0,
        numberOfMonths: 1,
        interestRate: 0,
        amount: 0,
        paymentModality: "",
        bankGuaranteeList: [],
    })

    const calculateValues = () => {

        let monthlyAmortization = 0;
        let total = 0;

        switch (+formData.paymentModality) {
            case 1:

                setInterestRate(0.20)

                total = +formData.amount + (+formData.amount * interestRate)

                monthlyAmortization = Math.round((total / (+formData.numberOfMonths * 30) * 100)) / 100

                setCredit(total)

                setAmortization(+monthlyAmortization);

                break;
            case 2:
                setInterestRate(0.25)

                total = +formData.amount + (+formData.amount * interestRate)

                monthlyAmortization = Math.round((total / (+formData.numberOfMonths * 4) * 100)) / 100

                setCredit(total)

                setAmortization(+monthlyAmortization)

                break;
            case 3:

                setInterestRate(0.30)

                total = +formData.amount + (+formData.amount * interestRate)

                monthlyAmortization = Math.round((total / (+formData.numberOfMonths) * 100)) / 100

                setCredit(total)

                setAmortization(+monthlyAmortization);

                break;
        }

    };

    const handleAddGuarantee = () => {
        if (guaranteeDescription.trim() !== "" && guaranteeAmount.trim() !== "") {
            const newGuarantee = {
                description: guaranteeDescription,
                amount: guaranteeAmount,
            };

            setFormData({
                ...formData,
                bankGuaranteeList: [...formData.bankGuaranteeList, newGuarantee],
            });
            // Clear input fields
            setGuaranteeDescription("");
            setGuaranteeValue("");
        }
    };

    const handleRemoveGuarantee = (index: number) => {
        const updatedGuarantees = [...formData.bankGuaranteeList];
        updatedGuarantees.splice(index, 1);
        setFormData({
            ...formData,
            bankGuaranteeList: updatedGuarantees,
        });

    };
    const calculateTotalAmount = () => {
        // Calculate the total amount from the bankGuaranteeList
        return formData.bankGuaranteeList.reduce(
            (total, guarantee) => total + parseFloat(String(guarantee.amount || 0)),
            0
        );
    };

    const totalAmount = calculateTotalAmount();


    React.useEffect(() => {

        const delay = setTimeout(() => {
            dispatch(fetchCustomers());
            setLoading(false);
        }, 2000);

        return () => clearTimeout(delay);

    }, [dispatch]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setShowCard(true);
        setProcessing(true);




        if (formData.paymentModality == '1') {
            formData.paymentModality = "Diario"
        }
        else if (formData.paymentModality == '2') {
            formData.paymentModality = "Semanal"
        }
        else {
            formData.paymentModality = "Mensal"
        }
        formData.interestRate = +interestRate

        try {
            const response = await dispatch(addLoan(formData));

            if (response && response.status === 200) {
                setError(false);

                setSuccess(true);

                clearFormData();
            }
        } catch (error) {
            setError(true);
        } finally {
            setTimeout(() => {
                setProcessing(false);
            }, 1000);
        }
    };

    function clearFormData() {
        setFormData({
            customerId: 0,
            numberOfMonths: 1,
            interestRate: 0,
            amount: 0,
            paymentModality: "",
            bankGuaranteeList: [],
        });
        setSelectedCustomer(null)
        setGuaranteeDescription("");
        setGuaranteeValue("");
        setAmortization(0);
        setCredit(0);
        setInterestRate(0);
    }

    const isSaveButtonDisabled = () => {
        const disabled = formData.amount === 0 ||
            formData.customerId === 0 ||
            formData.paymentModality === "" ||
            formData.bankGuaranteeList.length < 1 ||
            selectedCustomer.associatedLoan != null ||
            credit > totalAmount

        return disabled;
    };

    const isAddButtonDisabled = () => {
        return guaranteeDescription.trim() === "" || guaranteeAmount.trim() === "";
    };


    useEffect(() => {
        // Check if any of the form fields have changed
        if (formFieldsChanged) {
            calculateValues();
        }
    }, [formData, formFieldsChanged]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === "amount" || name === "paymentModality" || name === "numberOfMonths") {
            setFormFieldsChanged(true);
        }
    };


    const handleCustomerChange = (event, newValue) => {
        if (newValue) {
            // newValue is the selected customer object
            setSelectedCustomer(newValue);
            const selectedCustomerId = newValue.id; // Use the 'id' property as the customer ID
            setFormData({
                ...formData,
                customerId: selectedCustomerId,
            });
        } else {
            // Handle the case where nothing is selected (e.g., clear the customerId)
            setFormData({
                ...formData,
                customerId: 0, // Set to an appropriate default value or an empty state
            });
        }
    };
    function formatCurrency(amount) {
        const formattedAmount = amount.toFixed(2);

        const [integerPart, decimalPart] = formattedAmount.split('.');

        const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        const formattedCurrency = `${integerWithCommas}.${decimalPart}`;

        return `${formattedCurrency} MZN`;
    }

    const handleCardCloseSuccess = () => {
        setShowCard(false);
        setSuccess(false);
        clearFormData();
    }
    
    const handleCardCloseError = () => {

        setShowCard(false);

        setError(false);
    };

    return (
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            {showCard && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black
                        zIndex: 9998,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Card
                        sx={{
                            padding: '20px',
                            textAlign: 'center',
                            backgroundColor: 'whiteperl'
                        }}
                    >
                        {processing ? (
                            <>
                                <div className="flex flex-col items-center py-4 px-9 w-full">
                                    <CircularProgress sx={{ color: '#1E293B' }} />
                                    <span className="px-2">Processando...</span>
                                </div>

                            </>
                        ) : success ? (
                            <>
                                <CheckCircleOutline sx={{ fontSize: 40, color: 'green' }} />
                                <p>Empréstimo criado com sucesso!</p>
                                <button onClick={handleCardCloseSuccess} className="px-6 rounded-md py-1 mt-3 border border-stone-950">Fechar</button>

                            </>
                        ) : (
                            <>

                                <p className="flex flex-col items-center  py-4 px-3 text-red-500 ">
                                    <span>
                                        <Close sx={{ fontSize: 40 }} />
                                    </span>
                                    <span>
                                        Ocorreu um erro na criação do Empréstimo.
                                    </span>
                                </p>
                                <button onClick={handleCardCloseError} className="px-6 rounded-md py-1 mt-3 border border-stone-950">Fechar</button>

                            </>
                        )}
                    </Card>
                </div>
            )}

            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h2 className="font-semibold  py-4 text-base text-blueGray-800">
                            Adicionar Novo Empréstimo
                        </h2>

                        <form onSubmit={handleSubmit}>

                            <div className=" px-12  pt-12 min-w-48 min-h-screen-25 ">
                                <div className="flex flex-row justify-between">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <div className=" py-4 text-blueGray-800 font-medium items-center flex flex-row">
                                            <span className="uppercase text-2xl">{selectedCustomer?.fullName}</span>
                                        </div>
                                    </div>
                                    <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right flex flex-row justify-end  items-center">
                                        <span className="text-sm font-bold px-4" style={{ color: selectedCustomer?.associatedLoan ? '#f10000' : '#338d00' }}>
                                            {selectedCustomer?.associatedLoan ? "Devedor" : "Não Devedor"}
                                        </span>
                                        <div
                                            style={{
                                                backgroundColor: selectedCustomer?.associatedLoan ? '#f10000' : '#338d00',
                                                borderRadius: '50%',
                                                width: '2em',
                                                height: '2em',
                                            }}
                                            className="flex justify-center items-center"
                                        >
                                        </div>
                                    </div>

                                </div>
                                <div className="relative w-full flex flex-row gap-6 pr-4 max-w-full flex-grow flex-1">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <label htmlFor="selectCustomers" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cliente</label>
                                        <Autocomplete
                                            id="selectCustomers"
                                            options={customerList}
                                            sx={{ border: 'none' }}
                                            fullWidth
                                            getOptionLabel={(customer) => customer.idDocument.number} // Display the full name as the option label
                                            value={selectedCustomer}
                                            onChange={handleCustomerChange}
                                            renderInput={(params) => (
                                                <TextField  {...params} label="Número do Documento..." variant="outlined" fullWidth />
                                            )}
                                        />
                                    </div>



                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Montante</label>
                                        <TextField
                                            id="amount"
                                            name="amount"
                                            className="w-6/12 h-12"
                                            label="MZN"
                                            variant="outlined"
                                            fullWidth
                                            value={formData.amount}
                                            onChange={(e) => {
                                                const inputValue = e.target.value;

                                                if (/[^0-9]/.test(inputValue) || inputValue.length > 12) {
                                                    e.preventDefault();
                                                } else {
                                                    handleChange(e);
                                                }
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="relative w-full flex flex-row gap-6 py-8 pr-4 max-w-full flex-grow flex-1">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <label htmlFor="paymentModality" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Modalidade de Pagamento</label>
                                        <Select
                                            id="paymentModality"
                                            name="paymentModality"
                                            variant="outlined"
                                            label="Selecione..."
                                            fullWidth
                                            value={formData.paymentModality}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="1">Diário</MenuItem>
                                            <MenuItem value="2">Semanal</MenuItem>
                                            <MenuItem value="3">Mensal</MenuItem>
                                        </Select>
                                    </div>
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <label htmlFor="numberOfMonths" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Número de Meses</label>
                                        <Select
                                            id="numberOfMonths"
                                            name="numberOfMonths"
                                            className="w-6/12"

                                            variant="outlined"
                                            fullWidth
                                            value={formData.numberOfMonths!}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                        </Select>
                                    </div>

                                </div>


                            </div>
                            <Divider />
                            <div className=" min-w-48 min-h-screen-25  py-12 pr-12">
                                <h3 className="text-center text-xl">Garantias</h3>
                                <div className=" ">

                                    <div className="float-left w-9/12  min-h-screen-25 px-12 ">
                                        <div className="relative w-full flex flex-col pr-4 min-w-full flex-grow">
                                            <label htmlFor="guaranteeDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição do bem</label>
                                            <TextareaAutosize
                                                value={guaranteeDescription}
                                                onChange={event => setGuaranteeDescription(event.target.value)}
                                                minRows={5}
                                                maxRows={5}
                                                style={{
                                                    width: '100%',
                                                    height: '143px',
                                                    padding: '12px 20px',
                                                    boxSizing: 'border-box',
                                                    border: '2px solid #ccc',
                                                    borderRadius: '4px',
                                                    backgroundColor: '#ffffff',
                                                    fontSize: '16px',
                                                    resize: 'none'
                                                }}
                                            />

                                        </div>
                                    </div>
                                    <div className="min-h-screen-25">
                                        <div className="flex flex-col">
                                            <div className="pt-6 ">
                                                <label htmlFor="guaranteeAmount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valor Estimado</label>
                                                <div className="flex flex-row">
                                                    <TextField
                                                        id="guaranteeAmount"
                                                        name="guaranteeAmount"
                                                        type="text"
                                                        variant="outlined"
                                                        className="w-10/12"
                                                        value={guaranteeAmount}
                                                        onChange={event => setGuaranteeValue(event.target.value)}
                                                    />
                                                    <span
                                                        style={{
                                                            borderRadius: ' 0  4px 4px 0',
                                                            fontStyle: 'inherit',
                                                            fontSize: '14px'
                                                        }}
                                                        className="inline-flex items-center px-4 text-sm text-gray-900 bg-gray-200 border  border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                                        <p className="font-medium text-lg">.00 </p>&nbsp;<p className="font-medium text-lg">MZN</p>
                                                    </span>
                                                </div>
                                                <div className="pt-4">
                                                    <Button
                                                        type="button"
                                                        className="w-12/12"
                                                        variant="contained"
                                                        style={{
                                                            backgroundColor: isAddButtonDisabled() ? '#858585' : '#046d8d',
                                                            color: isAddButtonDisabled() ? '#fff' : '#fff',
                                                        }}
                                                        onClick={handleAddGuarantee}
                                                        disabled={isAddButtonDisabled()}
                                                    >
                                                        Adicionar
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>

                            </div>
                            <div className="py-2 px-12">
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className="text-sm font-bold text-blueGray-400 dark:text-white">Descrição</TableCell>
                                                <TableCell className="text-sm font-bold  text-blueGray-400 dark:text-white">Valor</TableCell>
                                                <TableCell className="text-sm font-bold text-blueGray-400 dark:text-white">Ações</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {formData.bankGuaranteeList.map((guarantee, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{guarantee.description}</TableCell>
                                                    <TableCell>{formatCurrency(+guarantee.amount)}</TableCell>
                                                    <TableCell>
                                                        <Button
                                                            type="button"
                                                            variant="contained"
                                                            color="error"
                                                            onClick={() => handleRemoveGuarantee(index)}
                                                        >
                                                            Remover
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                            <div className="w-12/12 h-12 px-12 grid grid-flow-col">
                                <Typography className="text-sm font-bold text-blueGray-800 dark:text-white">Juros: <span className="px-4 py-1 bg-gray-200 text-blueGray-800 font-bold"> {interestRate * 100}%</span></Typography>
                                <Typography className="text-sm font-bold text-blueGray-800 dark:text-white">Amortização: <span className="px-4 py-1 bg-gray-200 text-blueGray-800 font-bold">{formatCurrency(amortization)}</span></Typography>
                                <Typography className="text-sm font-bold text-blueGray-800 dark:text-white">Crédito Total: <span className="px-4 py-1 bg-gray-200 text-blueGray-800 font-bold">{formatCurrency(credit)}</span></Typography>
                            </div>
                            <div className="w-12/12 h-12 px-12 grid grid-flow-col">
                                <Typography className="text-sm font-bold text-blueGray-800 dark:text-white">Valor Total das Garantias: <span className="px-4 py-1 text-white font-bold" style={{ backgroundColor: (credit > totalAmount) ? '#f10000' : '#338d00' }}>{formatCurrency(totalAmount)}</span></Typography>

                            </div>
                            <div className="py-5 px-12 items-end float-right flex ">
                                <button
                                    onClick={() => clearFormData()}
                                    style={{
                                        paddingTop: '.8em',
                                        paddingBottom: '.8em',
                                        paddingLeft: '2em',
                                        paddingRight: '2em'
                                    }}
                                    type="button"
                                    className="bg-red-500 text-white active:bg-blueGray-600 text-sm font-bold uppercase rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                >
                                    Limpar
                                </button>

                                <Button
                                    type="submit"
                                    style={{
                                        backgroundColor: isSaveButtonDisabled() ? '#b2b2b2' : '#003d57',
                                        color: isSaveButtonDisabled() ? '#fff' : '#fff',
                                        paddingTop: '.8em',
                                        paddingBottom: '.8em',
                                        paddingLeft: '2em',
                                        paddingRight: '2em'
                                    }}
                                    disabled={isSaveButtonDisabled()} // Pass false to skip the bankGuaranteeList check
                                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                >
                                    Salvar
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

AddLoan.layout = Admin;
export default AddLoan;
