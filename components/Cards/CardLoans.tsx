import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import { useSelector } from "react-redux";
import {useAppDispatch} from "../../api/config/config";
import {fetchLoans} from "../../redux/effects/loans/effects";
import {fetchCustomers} from "../../redux/effects/customers/effects";

export default function CardLoans({loans}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Chart configuration
    var config = {
      type: "line",
      data: {
        labels: [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro",
        ],
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: "#153a49",
            borderColor: "#6caac2",
            data: Array.from({ length: 12 }, () => 0), // Initialize with zeros
            fill: false,
          },
          {
            label: new Date().getFullYear() - 1,
            fill: false,
            backgroundColor: "#4d3c15",
            borderColor: "#dc9c0f",
            data: Array.from({ length: 12 }, () => 0), // Initialize with zeros
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Loan Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };

    // Calculate total loans for each month
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;

    const totalLoansCurrentYear = Array.from({ length: 12 }, () => 0);
    const totalLoansLastYear = Array.from({ length: 12 }, () => 0);

    loans?.forEach((loan) => {
      const loanDate = new Date(loan.requestDate);
      const loanYear = loanDate.getFullYear();
      const loanMonth = loanDate.getMonth();

      if (loanYear === currentYear) {
        totalLoansCurrentYear[loanMonth] += 1;
      } else if (loanYear === lastYear) {
        totalLoansLastYear[loanMonth] += 1;
      }
    });

    // Update chart data with total loans
    config.data.datasets[0].data = totalLoansCurrentYear;
    config.data.datasets[1].data = totalLoansLastYear;

    // Get the chart canvas element by ID
    var ctx = document.getElementById("line-chart").getContext("2d");

    // Create the chart using Chart.js
    window.myLine = new Chart(ctx, config);


  },[loans]);

  return (
      <>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
          <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full max-w-full flex-grow flex-1">
                <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                  Análise
                </h6>
                <h2 className="text-white text-xl font-semibold">Pedidos de Empréstimos</h2>
              </div>
            </div>
          </div>
          <div className="p-4 flex-auto">
            {/* Chart */}
            <div className="relative h-350-px">
              <canvas id="line-chart"></canvas>
            </div>
          </div>
        </div>
      </>
  );
}
