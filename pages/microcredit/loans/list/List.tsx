import React, {useEffect, useState} from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import {fetchLoans} from "../../../../redux/effects/loans/effects";
import {encryptWithBuffer, useAppDispatch} from "../../../../api/config/config";
import {Property} from "csstype";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import Order = Property.Order;
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/reducers";
import Admin from "../../../../layouts/Admin";
import {Link} from "@mui/material";
import router from "next/router";
import {
    AccountBalanceWalletOutlined,
    AddOutlined,
    CreditCardOffOutlined,
    MoneyOutlined,
    WalletOutlined
} from "@mui/icons-material";
import NLoan from "../details";
import PageChange from "../../../../components/PageChange/PageChange";

interface Loan {
    nLoan: string;
    fullName: string;
    phoneNumber: string;
    amount: number;
    interestRate: number;
    totalPaid: number;
    amortization: number;
    numberOfMonths: number;
    credit: string;
    paymentModality: string;
    requestDate: string;
    documentNumber: string;
    city: string;
}

const columns: Array<{
    id: keyof Loan;
    label: string;
    numeric: boolean;
}> = [
    { id: 'nLoan', label: 'NLoan', numeric: false },
    { id: 'fullName', label: 'Cliente', numeric: false },
    { id: 'phoneNumber', label: 'Contacto', numeric: false },
    { id: 'amount', label: 'Montante Solicitado', numeric: true },
    { id: 'interestRate', label: 'Juros', numeric: true },
    { id: 'totalPaid', label: 'Pago', numeric: true },
    { id: 'amortization', label: 'Amortização', numeric: true },
    { id: 'credit', label: 'Crédito', numeric: false },
    { id: 'paymentModality', label: 'Modalidade', numeric: false },
    { id: 'numberOfMonths', label: 'Meses', numeric: true },
    { id: 'requestDate', label: 'Data de Solicitação', numeric: false },
    { id: 'documentNumber', label: 'Número do ID', numeric: false },
    { id: 'city', label: 'Cidade', numeric: false },
];




interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Loan) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof Loan) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const delay = setTimeout(() => {
            setLoading(false)
        }, 3000);

        return clearTimeout(delay);
    }, [])

    return (

        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">

                </TableCell>
                {columns.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'left' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={ orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}



interface EnhancedTableToolbarProps {
    numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.success.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Lista de Empréstimos
            </Typography>

            <Tooltip className="shadow-md" title="Adicionar Novo Empréstimo" onClick={() => router.push('/loans/add')}>
                <IconButton size="large" color="info">
                    <AccountBalanceWalletOutlined fontSize="medium" />
                </IconButton>
            </Tooltip>

        </Toolbar>
    );
}

const List: React.FC = () =>  {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Loan>('name');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const dispatch = useAppDispatch()
    const loans = useSelector((state: RootState) => state.loans.loans);
    const [selectedNLoan, setSelectedNLoan] = React.useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const delay = setTimeout(() => {
            dispatch(fetchLoans());
            setLoading(false);
        }, 3000);

        return () => clearTimeout(delay);

    }, [dispatch]);


    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Loan,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const handleClick = (event: React.MouseEvent<unknown>, nLoan: string) => {
        const selectedIndex = selected.indexOf(nLoan);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, nLoan);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelectedNLoan(isSelected(nLoan) ? null : nLoan);
        setSelected(newSelected);
    };


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - loans.length) : 0;

    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator<Key extends keyof any>(
        order: Order,
        orderBy: Key,
    ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
        const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }
    const handleDetails = (data) => {
        const key = encryptWithBuffer(data)
        router.push(`/microcredit/loans/${key}`);
    }

    function formatCurrency(amount) {
        const formattedAmount = amount.toFixed(2);
        const [integerPart, decimalPart] = formattedAmount.split('.');
        const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const formattedCurrency = `${integerWithCommas}.${decimalPart}`;
        return `${formattedCurrency} MZN`;
    }

    const visibleRows = React.useMemo(
        () =>
            stableSort(loans, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, loans],
    );


    return (
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            {loading ? (
                    <PageChange/>
                ): (
                <div className="rounded-t mb-0   border-0">
                    <div className="flex p-4 flex-wrap items-center">
                        <Box sx={{ width: '100%' }} >
                            <Paper sx={{ width: '100%'}}>
                                <EnhancedTableToolbar numSelected={selected.length} />
                                <TableContainer>
                                    <Table
                                        sx={{ minWidth: 1700 }}
                                        aria-labelledby="tableTitle"
                                        size={dense ? 'small' : 'medium'}
                                    >
                                        <EnhancedTableHead
                                            numSelected={selected.length}
                                            order={order}
                                            orderBy={orderBy}
                                            onRequestSort={handleRequestSort}
                                            rowCount={loans.length}
                                        />
                                        <TableBody>
                                            {visibleRows.map((row, index) => {
                                                const isItemSelected = isSelected(row.nLoan);
                                                const labelId = `enhanced-table-checkbox-${index}`;

                                                return (
                                                    <TableRow
                                                        hover
                                                        onClick={(event) => handleClick(event, row.nLoan)}
                                                        tabIndex={-1}
                                                        key={row.nLoan}
                                                        selected={isItemSelected}
                                                        sx={{ cursor: 'pointer' }}
                                                    >
                                                        <TableCell padding="checkbox"></TableCell>
                                                        <TableCell
                                                            component="th"
                                                            id={labelId}
                                                            scope="row"
                                                            padding="none"
                                                            style={{ width: '200px' }}
                                                        >
                                                            <Typography className="text-lightBlue-500 underline" onClick={() => handleDetails(row.nLoan)} underline="hover">
                                                                {row.nLoan}
                                                            </Typography>

                                                        </TableCell>
                                                        <TableCell align="left" style={{ width: '300px' }}>
                                                            {row.fullName}
                                                        </TableCell>
                                                        <TableCell align="left" style={{ width: '120px' }}>
                                                            {row.phoneNumber}
                                                        </TableCell>
                                                        <TableCell align="left" style={{ width: '180px' }}>
                                                            {formatCurrency(row.amount)}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px' }} align="left">
                                                            {`${row.interestRate*100}%`}
                                                        </TableCell>
                                                        <TableCell style={{ width: '150px' }} align="left">
                                                            {formatCurrency(row.totalPaid)}
                                                        </TableCell>
                                                        <TableCell style={{ width: '150px' }} align="left">
                                                            {formatCurrency(row.amortization)}
                                                        </TableCell>
                                                        <TableCell style={{ width: '150px' }} align="left">
                                                            {formatCurrency(row.credit)}
                                                        </TableCell>
                                                        <TableCell style={{ width: '150px' }} align="left">
                                                            {row.paymentModality}
                                                        </TableCell>
                                                        <TableCell style={{ width: '150px' }} align="left">
                                                            {row.numberOfMonths}
                                                        </TableCell>
                                                        <TableCell style={{ width: '150px' }} align="left">
                                                            {row.requestDate ? formatDate(row.requestDate) : 'dd/MM/yyyy'}
                                                        </TableCell>
                                                        <TableCell style={{ width: '150px' }} align="left">
                                                            {row.documentNumber}
                                                        </TableCell>
                                                        <TableCell style={{ width: '150px' }} align="left">
                                                            {row.city}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, 100]}
                                    component="div"
                                    count={loans.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Paper>

                        </Box>
                    </div>

            {selectedNLoan && (
                <NLoan nLoan={selectedNLoan} />
                )}
                </div>
                )
            }
        </div>

    );
}
List.layout = Admin
export default List;
