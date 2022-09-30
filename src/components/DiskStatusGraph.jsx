import React from "react";
import ReactApexChart from "react-apexcharts";

const DiskStatusGraph = ({ eachGraphInfo }) => {
  const freeSpace = eachGraphInfo.freeSpace;
  const diskUsed = 100 - freeSpace;

  const series = [diskUsed, freeSpace];
  const options = {
    labels: ["Disk used", "Disk available"],
    colors: ["#fa5c4b", "#48a8f7"],
    chart: {
      type: "donut",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    legend: {
      position: "bottom",
    },
  };

  return (
    <div className="flex justify-center">
      <div className="my-6 md:my-3">
        <h2 className="text-[16px] md:text-[18px] font-medium text-center">
          Current disk status
        </h2>
        <p className="text-center ">{eachGraphInfo.today}</p>
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          height={300}
        />
      </div>
    </div>
  );
};

export default DiskStatusGraph;
