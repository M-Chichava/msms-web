import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Customer } from "../../../../models/customer";
import { addCustomer } from "../../../../redux/effects/customers/effects";
import { useAppDispatch } from "../../../../api/config/config";
import Admin from "../../../../layouts/Admin";
import {
    Box,
    Button,
    Card,
    CircularProgress,
    Divider,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { fetchLoans } from "../../../../redux/effects/loans/effects";
import { CheckCircleOutline, Close, CloseFullscreen } from "@mui/icons-material";

const AddCustomer: React.FC = () => {
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showCard, setShowCard] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        maritalStatus: "Solteiro",
        nuit: "",
        documentType: "Bilhete de Identidade",
        idNumber: "",
        placeOfIssue: "",
        expirationDate: null,
        issueDate: null,
        nationality: "",
        naturalness: "",
        birthDay: null,
        street: "",
        place: "",
        city: "",
        block: "",
        neighborhood: "",
    });

    const dispatch = useAppDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDateChange = (field: string, date: Date | null) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: date,
        }));
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(delay);
    }, [dispatch]);

    const clearFormData = () => {
        setFormData({
            fullName: "",
            email: "",
            phoneNumber: "",
            maritalStatus: "Solteiro",
            nuit: "",
            documentType: "Bilhete de Identidade",
            idNumber: "",
            placeOfIssue: "",
            expirationDate: null,
            issueDate: null,
            nationality: "",
            naturalness: "",
            birthDay: null,
            street: "",
            place: "",
            city: "",
            block: "",
            neighborhood: "",
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setShowCard(true);
        setProcessing(true);

        try {
            const response = await dispatch(addCustomer(formData));

            if (response && response.status === 200) {

                setSuccess(true);
                setError(false);

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

    const handleCardCloseSuccess = () => {
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
                                <p>Cliente adicionado com sucesso!</p>
                                <button onClick={handleCardCloseSuccess} className="px-6 rounded-md py-1 mt-3 border border-stone-950">Fechar</button>

                            </>
                        ) : (
                            <>

                                <p className="flex flex-col items-center  py-4 px-3 text-red-500 ">
                                    <span>
                                        <Close sx={{ fontSize: 40 }} />
                                    </span>
                                    <span>
                                        Ocorreu um erro na adição do novo cliente.
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
                            Adicionar Novo Cliente
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="relative flex flex-col p-4 min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-md">
                                <h3 className="font-semibold text-base text-blueGray-800">
                                    Dados Pessoais
                                </h3>
                                <div className="flex-auto p-4">
                                    <div className="flex py-2 flex-wrap">
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome Completo:</label>
                                            <TextField
                                                id="fullName"
                                                name="fullName"
                                                type="text"
                                                variant="outlined"
                                                fullWidth
                                                value={formData.fullName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            <label htmlFor="maritalStatus" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado Civil:</label>
                                            <Select
                                                id="maritalStatus"
                                                name="maritalStatus"
                                                variant="outlined"
                                                fullWidth
                                                value={formData.maritalStatus!}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={"Solteiro"}>Solteiro</MenuItem>
                                                <MenuItem value={"Casado"}>Casado</MenuItem>
                                                <MenuItem value={"Separado"}>Separado</MenuItem>
                                                <MenuItem value={"Divorciado"}>Divorciado</MenuItem>
                                                <MenuItem value={"Viúvo"}>Viúvo</MenuItem>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="flex py-2 flex-wrap">
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            <label id="nuit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NUIT:</label>
                                            <TextField
                                                variant="outlined"
                                                id="nuit"
                                                name="nuit"
                                                type="text"
                                                fullWidth
                                                value={formData.nuit}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            <label htmlFor="documentType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de Documento:</label>
                                            <Select
                                                id="documentType"
                                                name="documentType"
                                                variant="outlined"
                                                fullWidth
                                                value={formData.documentType!}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={"Bilhete de Identidade"}>Bilhete de Identidade</MenuItem>
                                                <MenuItem value={"Passaporte"}>Passaporte</MenuItem>
                                                <MenuItem value={"Carta de Conducao"}>Carta de Conducao</MenuItem>
                                            </Select>
                                        </div>

                                    </div>
                                    <div className="flex py-2 flex-wrap">
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            <label htmlFor="idNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Número de Identificação:</label>
                                            <TextField
                                                id="idNumber"
                                                name="idNumber"
                                                type="text"
                                                variant="outlined"
                                                fullWidth
                                                value={formData.idNumber}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Número de Telefone:</label>
                                            <TextField
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                type="text"
                                                variant="outlined"
                                                fullWidth
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            <label htmlFor="birthDay" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data de Nascimento:</label>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    id="birthDay"
                                                    name="birthDay"
                                                    selected={formData.birthDay}
                                                    onChange={(date) => handleDateChange('birthDay', date)}
                                                    dateFormat="dd/MM/yyyy"
                                                    isClearable
                                                />
                                            </LocalizationProvider>
                                        </div>
                                    </div>
                                    <div className="flex py-2 flex-wrap">

                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            <label htmlFor="placeOfIssue" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Local de Emissão:</label>
                                            <TextField
                                                id="placeOfIssue"
                                                name="placeOfIssue"
                                                type="text"
                                                variant="outlined"
                                                fullWidth
                                                value={formData.placeOfIssue}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
                                            <TextField
                                                id="email"
                                                name="email"
                                                type="email"
                                                variant="outlined"
                                                fullWidth
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            <label htmlFor="issueDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data de Emissão:</label>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    id="issueDate"
                                                    name="issueDate"
                                                    selected={formData.issueDate}
                                                    onChange={(date) => handleDateChange('issueDate', date)}
                                                    dateFormat="dd/MM/yyyy"
                                                    isClearable
                                                />
                                            </LocalizationProvider>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap py-2">
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            <label htmlFor="nationality" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nacionalidade:</label>
                                            <TextField
                                                id="nationality"
                                                name="nationality"
                                                type="text"
                                                variant="outlined"
                                                fullWidth
                                                value={formData.nationality}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            <label htmlFor="naturalness" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Naturalidade:</label>
                                            <TextField
                                                id="naturalness"
                                                name="naturalness"
                                                type="text"
                                                variant="outlined"
                                                fullWidth
                                                value={formData.naturalness}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            <label htmlFor="expirationDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data de Expiração:</label>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    id="expirationDate"
                                                    name="expirationDate"
                                                    selected={formData.expirationDate}
                                                    onChange={(date) => handleDateChange('expirationDate', date)}
                                                    dateFormat="dd/MM/yyyy"
                                                    isClearable
                                                />
                                            </LocalizationProvider>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Divider className="py-2" />
                            <div className="relative flex flex-col p-4 min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                                <h3 className="font-semibold text-base text-blueGray-700">
                                    Endereço
                                </h3>
                                <div className="flex-auto p-4">
                                    <div className="flex flex-wrap py-2">

                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            <label htmlFor="place" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Localidade:</label>
                                            <TextField
                                                id="place"
                                                name="place"
                                                type="text"
                                                variant="outlined"
                                                fullWidth
                                                value={formData.place}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cidade:</label>
                                            <TextField
                                                id="city"
                                                name="city"
                                                type="text"
                                                variant="outlined"
                                                fullWidth
                                                value={formData.city}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            <label htmlFor="block" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quarteirão:</label>
                                            <TextField
                                                id="block"
                                                name="block"
                                                type="text"
                                                variant="outlined"
                                                fullWidth
                                                value={formData.block}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap py-2">
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            <label htmlFor="street" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rua:</label>
                                            <TextField
                                                id="street"
                                                name="street"
                                                type="text"
                                                variant="outlined"
                                                fullWidth
                                                value={formData.street}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            <label htmlFor="neighborhood" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bairro:</label>
                                            <TextField
                                                id="neighborhood"
                                                name="neighborhood"
                                                type="text"
                                                variant="outlined"
                                                fullWidth
                                                value={formData.neighborhood}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="py-5 items-end float-right flex ">
                                <button
                                    onClick={() => clearFormData()}
                                    type="button"
                                    className="bg-red-500 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                >
                                    Limpar
                                </button>

                                <button
                                    type="submit"
                                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                >
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

AddCustomer.layout = Admin;
export default AddCustomer;
