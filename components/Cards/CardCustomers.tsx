import React, {useEffect, useState} from "react";
import Chart from "chart.js";

export default function CardCustomers({customers}) {
  const [customerData, setCustomerData] = useState({
    currentYear: Array.from({ length: 12 }, () => 0),
    lastYear: Array.from({ length: 12 }, () => 0),
  });
 

  useEffect(() => {
    // Calculate total customers for each month
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;

    const totalCustomersCurrentYear = Array.from({ length: 12 }, () => 0);
    const totalCustomersLastYear = Array.from({ length: 12 }, () => 0);

    customers?.forEach((customer) => {
      const customerDate = new Date(customer.createdAt);
      const customerYear = customerDate.getFullYear();
      const customerMonth = customerDate.getMonth();

      if (customerYear === currentYear) {
        totalCustomersCurrentYear[customerMonth]++;
      } else if (customerYear === lastYear) {
        totalCustomersLastYear[customerMonth]++;
      }
    });

    // Atualize o estado com os dados do cliente
    setCustomerData({
      currentYear: totalCustomersCurrentYear,
      lastYear: totalCustomersLastYear,
    });
  }, [customers]);

  useEffect(() => {
    const config = {
      type: "bar",
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
            backgroundColor: "#30a1c9",
            borderColor: "#0f5c7c",
            data: customerData.currentYear,
            fill: false,
            barThickness: 8,
          },
          {
            label: new Date().getFullYear() - 1,
            fill: false,
            backgroundColor: "#ce9b3a",
            borderColor: "#9d7212",
            data: customerData.lastYear,
            barThickness: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Clientes",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              display: false,
              scaleLabel: {
                display: true,
                labelString: "Month",
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };

    const ctx = document.getElementById("bar-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, [customerData]);

  return (
      <>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full max-w-full flex-grow flex-1">
                <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                  Análise
                </h6>
                <h2 className="text-blueGray-700 text-xl font-semibold">
                  Total de Clientes
                </h2>
              </div>
            </div>
          </div>
          <div className="p-4 flex-auto">
            {/* Chart */}
            <div className="relative h-350-px">
              <canvas id="bar-chart"></canvas>
            </div>
          </div>
        </div>
      </>
  );
}
