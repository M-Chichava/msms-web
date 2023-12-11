import React, {useEffect, useState} from "react";
import CardLoans from "components/Cards/CardLoans";
import CardCustomers from "components/Cards/CardCustomers";
import CardDelayedPayments from "components/Cards/CardDelayedPayments";
import CardExpireContractsTable from "components/Cards/CardExpireContractsTable";

import Admin from "layouts/Admin";
import {fetchLoans} from "../../redux/effects/loans/effects";
import {fetchCustomers} from "../../redux/effects/customers/effects";
import {useAppDispatch} from "../../api/config/config";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/reducers";
import PageChange from "../../components/PageChange/PageChange";

const Dashboard: React.FC = () => {
    const dispatch = useAppDispatch()
    const loans = useSelector((state: RootState )=> state.loans.loans)
    const customers = useSelector((state: RootState )=> state.customers.customers)
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {


        // Fetch data and calculate statistics here
        const fetchData = async () => {
            try {
                dispatch(fetchLoans())
                dispatch(fetchCustomers())
            } catch (error) {
            }
        };

        const delay = setTimeout(() => {
            setLoading(false);
        }, 3000);

        fetchData();

        const intervalId = setInterval(fetchData, 180000); // 60000 milliseconds = 1 minutes

        return () => {
            clearTimeout(delay);
            clearInterval(intervalId);
        };

    }, []);


  return (
    <>
        {loading ? (<PageChange/>) : (
            <>

          <div className="flex flex-wrap">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
              <CardLoans loans={loans} />
            </div>
            <div className="w-full xl:w-4/12 px-4">
              <CardCustomers customers={customers} />
            </div>
          </div>
          <div className="flex flex-wrap mt-4">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
              <CardDelayedPayments />
            </div>
            <div className="w-full xl:w-4/12 px-4">
              <CardExpireContractsTable />
            </div>
          </div>
            </>
        )}
    </>
  );
}

Dashboard.layout = Admin;
export default Dashboard;