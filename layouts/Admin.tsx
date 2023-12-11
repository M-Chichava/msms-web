import React, {useEffect, useState} from "react";

// components

import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import HeaderStats from "components/Headers/HeaderStats";
import FooterAdmin from "components/Footers/FooterAdmin";
import {fetchLoans} from "../redux/effects/loans/effects";
import {useAppDispatch} from "../api/config/config";
import {fetchCustomers} from "../redux/effects/customers/effects";
import {useSelector} from "react-redux";
import {RootState} from "../redux/reducers";
import {fetchPayments} from "../redux/effects/payments/effects";
import BreadcrumbItem from "../components/BreadCumbItem/BreadcrumbItem";

import {Breadcrumbs} from "@mui/material";
import {useRouter} from "next/router";
import PageChange from "../components/PageChange/PageChange";


export default function Admin({ children }) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    let loansList;
    let customersList;
    let paymentsList;
    const {asPath} = router;

    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const delay = setTimeout(() => {

            setLoading(false);
        }, 5000);

        return () => clearTimeout(delay);

    }, [dispatch]);

    const pathSegments = asPath.split('/').filter(Boolean);


    const breadcrumbItems = pathSegments.map((segment, index) => {

        const path = `/${pathSegments.slice(0, index + 1).join('/')}`;

        const isActive = path === asPath;

        return <BreadcrumbItem key={path} path={path} label={segment} isActive={isActive} isDisabled={isActive}/>;

    });

    let loans
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(fetchLoans());
                dispatch(fetchCustomers());
                dispatch(fetchPayments());
                loansList = useSelector((state: RootState) => state.loans.loans);
                customersList = useSelector((state: RootState) => state.customers.customers);
                paymentsList = useSelector((state: RootState) => state.payments.payments);
                setLoading(false);
            } catch (error) {
                // Handle errors here
            }
        };

        const delay = setTimeout(() => {
            setLoading(false);
        }, 3000);

        fetchData(); // Call the fetchData function here

        const intervalId = setInterval(fetchData, 30000); // 60000 milliseconds = 1 minute

        return () => {
            clearTimeout(delay);
            clearInterval(intervalId);
        };
    }, [dispatch]);

    return (
        <>
            {loading ? (
                <PageChange/>
            ) : (
                <>
                    <Sidebar/>
                    <div className="relative md:ml-64 bg-blueGray-100">
                        <AdminNavbar/>
                        <HeaderStats/>
                        <div className="px-10 md:px-10 mx-auto w-full -m-24">
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6">
                                <div className="rounded-t mb-0   border-0">
                                    <div className="flex p-2 flex-wrap items-center bg-blueGray-700">
                                        <Breadcrumbs
                                            sx={{
                                                '& ol': {
                                                    backgroundColor: '#475569',
                                                    padding: '0.5rem 1rem',
                                                },
                                            }}
                                        >
                                            {breadcrumbItems}
                                        </Breadcrumbs>
                                    </div>
                                </div>
                            </div>
                            {children}
                            <FooterAdmin/>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
