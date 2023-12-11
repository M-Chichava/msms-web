import React, {useState} from 'react';
import Admin from "../../../../layouts/Admin";

import {encryptWithBuffer, IV_SECRET, SECRET_BUFFER, useAppDispatch} from "../../../../api/config/config";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/reducers";
import {Alert, Autocomplete, MenuItem, Select, TextareaAutosize, TextField} from "@mui/material";
import {addLoan, fetchLoans} from "../../../../redux/effects/loans/effects";
import {descriptions} from "jest-config";
import {addPayment} from "../../../../redux/effects/payments/effects";
import ProcessingDialog from "../../../../components/Dialog/ProcessingDialog";
import AlertDialog from "../../../../components/Dialog/AlertDialog";
import {fetchCustomersActiveLoans} from "../../../../redux/effects/customers/effects";
import router from "next/router";
import PageChange from "../../../../components/PageChange/PageChange";

const Add: React.FC = () => {
    const dispatch = useAppDispatch()
    const customerList = useSelector((state: RootState) => state.customers.debtorCustomers[0]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [formFieldsChanged, setFormFieldsChanged] = useState<boolean>(false);
    const [formData, setFormData] = useState({ nLoan: "", description: "", amountPaid: 0 })
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(true);


    React.useEffect(() => {
        const delay = setTimeout(() => {
            dispatch(fetchCustomersActiveLoans())
            setLoading(false);
        }, 3000);

        return () => clearTimeout(delay);
    }, [dispatch]);

    const handleCustomerChange = (event, newValue) => {
        if (newValue) {
            // newValue is the selected customer object
            setSelectedCustomer(newValue);
            const selectedCustomernLoan= newValue.associatedLoan;
            setFormData({
                ...formData,
                nLoan: selectedCustomernLoan,
            });
        } else {
            // Handle the case where nothing is selected (e.g., clear the customerId)
            setFormData({
                ...formData,
                nLoan: "", // Set to an appropriate default value or an empty state
            });
        }
    };

    function clearFormData() {
        setFormData({
            amountPaid: 0,
            description: "",
            nLoan: ""
        });
        setSelectedCustomer(null)
    }


    function formatCurrency(amount) {
        const formattedAmount = amount.toFixed(2);

        const [integerPart, decimalPart] = formattedAmount.split('.');

        const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        const formattedCurrency = `${integerWithCommas}.${decimalPart}`;

        return `${formattedCurrency} MZN`;
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setOpenDialog(true);
        try {
            const response = await dispatch(addPayment(formData));

            clearFormData();
        } catch (error) {

        } finally {
            setOpenDialog(true);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

    };

    const handleDetails = (data) => {
      const key = encryptWithBuffer(data)
         router.push(`/microcredito/loans/${key}`);
    }


    return (
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            {loading? (<PageChange/>) :(
            <div className="rounded-t mb-0   border-0">
                <div className="flex p-4 flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h2 className="font-semibold  py-4 text-base text-blueGray-800">
                            Adicionar Novo Pagamento
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-row justify-between">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <div className=" py-4 text-blueGray-800 font-medium items-center flex flex-row">
                                        <span className="uppercase text-2xl py">{selectedCustomer?.fullName}</span>
                                    </div>
                                </div>


                            </div>
                            <div className=" px-12  pt-12 min-w-48 min-h-screen-25 ">
                                <div className="relative w-full flex flex-row gap-6 pr-4 max-w-full flex-grow flex-1">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <label htmlFor="selectCustomers" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cliente</label>
                                        <Autocomplete
                                            id="selectCustomers"
                                            options={customerList}
                                            sx={{ border: 'none' }}
                                            fullWidth
                                            getOptionLabel={(customer) => customer?.idDocument?.number || ''}
                                            value={selectedCustomer}
                                            onChange={handleCustomerChange}
                                            renderInput={(params) => (
                                                <TextField  {...params} label="Número do Documento..." variant="outlined" fullWidth />
                                            )}
                                        />
                                    </div>

                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <label htmlFor="selectCustomers" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loan Associado</label>
                                        <div className="bg-gray-200 py-4 text-blueGray-800 font-medium underline justify-center items-center flex flex-row"><span onClick={() => handleDetails(formData.nLoan)} className="cursor-pointer">{formData.nLoan}</span></div>
                                    </div>
                                </div>
                                <div className="flex py-2 flex-wrap">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <label id="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição</label>
                                        <TextField
                                            variant="outlined"
                                            id="description"
                                            name="description"
                                            type="text"
                                            fullWidth
                                            value={formData.description}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <label htmlFor="amountPaid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valor a Depositar</label>
                                        <div className="flex flex-row">
                                        <TextField
                                            id="amountPaid"
                                            name="amountPaid"
                                            type="text"
                                            variant="outlined"
                                            className="w-10/12"
                                            value={formData.amountPaid}
                                            onChange={ handleChange}
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
                                    </div>

                                </div>
                            <div className="py-5 items-end float-right flex ">
                                <button onClick={() => clearFormData()} type="button" className="bg-red-500 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                >Limpar
                                </button>

                                <button
                                    type="submit" className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                >Salvar
                                </button>
                            </div>
                            </div>
                            {openDialog && <AlertDialog open={openDialog} />}
                        </form>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

Add.layout = Admin
export default Add;