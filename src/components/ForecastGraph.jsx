import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

// import { eachGraphInfo } from "./graphInfos";

const ForecastGraph = ({ eachGraphInfo }) => {
  // console.log("all graph infos", eachGraphInfo)
  const [data, setData] = useState(eachGraphInfo[0].yhat);
  const [dataLower, setDataLower] = useState(eachGraphInfo[0].lower);
  const [dataUpper, setDataUpper] = useState(eachGraphInfo[0].upper);
  const [duration, setDuration] = useState(eachGraphInfo[0].duration);
  const [month, setMonth] = useState(3);
  const [forecastPoint, setForecastPoint] = useState(
    eachGraphInfo[0].forecastDataPoint
  );
  const [ticker, setTicker] = useState(eachGraphInfo[0].tickAmount);
  const [rate, setRate] = useState(eachGraphInfo[0].fluctuation);

  const handleClick = (mn) => {
    setMonth(mn);
  };

  useEffect(() => {
    const setPredictionRange = (ind) => {
      setData(eachGraphInfo[ind].yhat);
      setDataLower(eachGraphInfo[ind].lower);
      setDataUpper(eachGraphInfo[ind].upper);
      setDuration(eachGraphInfo[ind].duration);
      setForecastPoint(eachGraphInfo[ind].forecastDataPoint);
      setTicker(eachGraphInfo[ind].tickAmount);
      setRate(eachGraphInfo[ind].fluctuation);
    };

    switch (month) {
      case 3:
        setPredictionRange(0);
        break;
      case 6:
        setPredictionRange(1);
        break;
      case 12:
        setPredictionRange(2);
        break;
      default:
        setPredictionRange(0);
    }
  }, [month, eachGraphInfo]);

  const series = [
    {
      name: "Higher Posibility",
      // type: 'line',
      data: dataUpper,
    },
    {
      name: "Disk Available",
      // type: 'line',
      data: data,
    },
    {
      name: "Lower Posibility",
      // type: 'line',
      data: dataLower,
    },
  ];
  const options = {
    chart: {
      height: 550,
      type: "line",
    },
    forecastDataPoints: {
      count: forecastPoint,
      dashArray: 2,
    },
    stroke: {
      width: 2,
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: duration,
      tickAmount: ticker,
      labels: {
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM 'yy",
          day: "dd MMM",
          hour: "HH:mm",
        },
        style: {
          fontSize: "10",
        },
      },
    },
    title: {
      text: "",
      align: "left",
      style: {
        fontSize: "16px",
        color: "#666",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        inverseColors: false,
        shade: "light",
        gradientToColors: ["#f00", "#f00", "#f00", "#f00", "#f00"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 0.5,
        stops: [0, 50, 100, 0],
      },
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        formatter: (val, index) => {
          return val;
        },
      },
    },
  };

  return (
    <div id="chart">
      <div className="md:flex justify-between items-center">
        <h2 className="text-[16px] md:text-[18px] sm:w-full md:w-2/3 font-medium mt-3 md:my-6">
          Disk prediction in {month} months
        </h2>
        <div className="bg-green-200 sm:w-full my-3 md:w-4/6 lg:w-4/8 xl:w-3/6 2xl:w-2/6">
          <button
            onClick={() => handleClick(3)}
            className="text-[12px] md:text-[12px] lg:text-[16px] bg-gray-300 hover:bg-gray-400 text-gray-800 md:font-medium py-2 w-1/3 md:w-1/3 rounded-l"
          >
            3 months
          </button>
          <button
            onClick={() => handleClick(6)}
            className="text-[12px] md:text-[12px] lg:text-[16px] bg-gray-300 hover:bg-gray-400 text-gray-800 md:font-medium py-2 w-1/3 md:w-1/3 px-4"
          >
            6 months
          </button>
          <button
            onClick={() => handleClick(12)}
            className="text-[12px] md:text-[12px] lg:text-[16px] bg-gray-300 hover:bg-gray-400 text-gray-800 md:font-medium py-2 w-1/3 md:w-1/3 rounded-r"
          >
            1 year
          </button>
        </div>
      </div>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={500}
      />
      <div className="flex justify-center flex-row">
        <h1 className="justify-center">{rate[0]} Rate:</h1>
        <p className="font-bold">{`${"\u00a0\u00a0" + rate[1].toFixed(2)}%`}</p>
      </div>
    </div>
  );
};

export default ForecastGraph;
