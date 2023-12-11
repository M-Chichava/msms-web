import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardStats from "components/Cards/CardStats";
import {API_URL, useAppDispatch} from "../../api/config/config";
import { User } from "../../models/user";
import { RootState } from "../../redux/reducers";
import {dispatch} from "jest-circus/build/state";
import {fetchCustomers} from "../../redux/effects/customers/effects";
import {fetchLoans} from "../../redux/effects/loans/effects";
import {fetchPayments} from "../../redux/effects/payments/effects";

export default function HeaderStats() {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalLiquidatedLoans, setTotalLiquidatedLoans] = useState(0);
  const [totalContracts, setTotalContracts] = useState(0);
  const [totalLoans, setTotalLoans] = useState(0);
  const [percentageChangeLoans, setPercentageChangeLoans] = useState(0);
  const [percentageChangeCustomers, setPercentageChangeCustomers] = useState(0);
  const [numIncreasesLoans, setNumIncreasesLoans] = useState(0);
  const [numIncreasesCustomers, setNumIncreasesCustomers] = useState(0);
const dispatch = useAppDispatch()
  const user: User | null = useSelector((state: RootState) => state.auth.user);

  const loansList = useSelector((state: RootState) => state.loans.loans);
  const customersList = useSelector((state: RootState) => state.customers.customers);
  const liquidatedLoansList = useSelector((state: RootState) =>
      state.loans.loans?.filter((loan) => loan.status === 'Liquidado')
  );
  const transactionsData = useSelector((state: RootState) => state.transactions.transactions);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchLoans())
        dispatch(fetchCustomers())
        dispatch(fetchPayments())

        customersPercentage()
        loansPercentage()
        paymentsAverages()
      } catch (error) {
      }
    };

    const intervalId = setInterval(fetchData, 30000); // 60000 milliseconds = 1 minutes

    return () => clearInterval(intervalId);

  }, []);





  const customersPercentage = () => {
    const currentDate = new Date();

// Calculate the start and end dates for the current month
    const currentMonthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const currentMonthEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

// Calculate the start and end dates for the past month
    const pastMonthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const pastMonthEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

// Filter customers created in the current month
    const customersCreatedInCurrentMonth = customersList.filter((customer) => {
      const customerCreateDate = new Date(customer.createdAt);
      return (
          customerCreateDate >= currentMonthStartDate && customerCreateDate <= currentMonthEndDate
      );
    });

// Filter customers created in the past month
    const customersCreatedInPastMonth = customersList.filter((customer) => {
      const customerCreateDate = new Date(customer.createdAt);
      return (
          customerCreateDate >= pastMonthStartDate && customerCreateDate <= pastMonthEndDate
      );
    });

// Calculate the counts
    const currentMonthCount = customersCreatedInCurrentMonth.length;
    const pastMonthCount = customersCreatedInPastMonth.length;


// Calculate the percentage change
    const percentageChange =
        (currentMonthCount - pastMonthCount) / (pastMonthCount || 1) * 100;

    setNumIncreasesCustomers((currentMonthCount - pastMonthCount))

    setTotalCustomers(customersList.length)
    setPercentageChangeCustomers(percentageChange)
  }

  const paymentsAverages = () => {
    setTotalLiquidatedLoans(liquidatedLoansList.length)
  }


  const loansPercentage = () => {
      const currentDate = new Date();


// Calculate the start and end dates for the current month
      const currentMonthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

      const currentMonthEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

// Calculate the start and end dates for the past month
      const pastMonthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

    const pastMonthEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);


// Filter loans created in the current month
      const loansCreatedInCurrentMonth = loansList.filter((loan) => {
        const loanCreateDate = new Date(loan.requestDate);
        return (
            loanCreateDate >= currentMonthStartDate && loanCreateDate <= currentMonthEndDate
        );
      });

// Filter loans created in the past month
      const loansCreatedInPastMonth = loansList.filter((loan) => {
        const loanCreateDate = new Date(loan.requestDate);
        return (
            loanCreateDate >= pastMonthStartDate && loanCreateDate <= pastMonthEndDate
        );
      });

// Calculate the counts
      const currentMonthCount = loansCreatedInCurrentMonth.length;
      const pastMonthCount = loansCreatedInPastMonth.length;


// Calculate the percentage change
      const percentageChange =
          (currentMonthCount - pastMonthCount) / (pastMonthCount || 1) * 100;

      setNumIncreasesLoans((currentMonthCount - pastMonthCount))
      setTotalLoans(loansList.length)
      setPercentageChangeLoans(percentageChange)

  }


  return (
      <>
        {/* Header */}
        <div className="relative bg-blueGray-600 pb-6  md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div>
              {/* Card stats */}
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                  <CardStats
                      statSubtitle="EMPRÉSTIMOS"
                      statTitle={totalLoans?.toString() || "0"}
                      statArrow={numIncreasesLoans > 0 ? "up" : "down"}
                      statPercent={`${percentageChangeLoans?.toFixed(2)}%`}
                      statPercentColor={numIncreasesLoans > 0 ? "text-emerald-500" : "text-red-500"}
                      statDescripiron="Desde o último mês"
                      statIconName="fa fa-wallet"
                      statIconColor="bg-red-500"
                  />
                </div>
                <div className="w-full lg:w-6/12 xl:w-4/12 px-4 font-sans">
                  <CardStats
                      statSubtitle="CLIENTES"
                      statTitle={totalCustomers?.toString() || "0"}
                      statArrow={numIncreasesCustomers > 0 ? "up" : "down"}
                      statPercent={`${percentageChangeCustomers?.toFixed(2)}%`}
                      statPercentColor={numIncreasesCustomers > 0 ? "text-emerald-500" : "text-red-500"}
                      statDescripiron="Desde o último mês"
                      statIconName="fa fa-users"
                      statIconColor="bg-orange-500"
                  />
                </div>
                <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                  <CardStats
                      statSubtitle="EMPRÉSTIMOS LIQUIDADOS"
                      statTitle={totalLiquidatedLoans?.toString() || "0"}
                      statArrow=""
                      statPercent=""
                      statPercentColor=""
                      statDescripiron=""
                      statIconName="fa fa-credit-card"
                      statIconColor="bg-pink-500"
                  />
                </div>
                {/*<div className="w-full lg:w-6/12 xl:w-3/12 px-4">*/}
                {/*  <CardStats*/}
                {/*      statSubtitle="CONTRACTOS EXPIRADOS"*/}
                {/*      statTitle={totalContracts?.toString() || "0"}*/}
                {/*      statArrow=""*/}
                {/*      statPercent=""*/}
                {/*      statPercentColor=""*/}
                {/*      statDescripiron=""*/}
                {/*      statIconName="fas fa-file-invoice"*/}
                {/*      statIconColor="bg-lightBlue-400"*/}
                {/*  />*/}
                {/*</div>*/}
              </div>
            </div>
          </div>
        </div>
      </>
  );
}
