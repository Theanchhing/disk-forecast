import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

// import { eachGraphInfo } from "./graphInfos";

const ForecastGraph = ({ eachGraphInfo }) => {
  // console.log("all graph infos", eachGraphInfo)
    const [data, setData] = useState(eachGraphInfo[0].yhat);
    const [dataLower, setDataLower] = useState(eachGraphInfo[0].lower);
    const [dataUpper, setDataUpper] = useState(eachGraphInfo[0].upper);
    const [duration, setDuration] = useState(eachGraphInfo[0].duration)
    const [month, setMonth] = useState(3)
    const [forecastPoint, setForecastPoint] = useState(eachGraphInfo[0].forecastDataPoint)
    const [ticker, setTicker] = useState(eachGraphInfo[0].tickAmount)
    const [rate, setRate] = useState(eachGraphInfo[0].fluctuation)

    const handleClick = (mn) => {
        setMonth(mn)
        console.log("Clicked...")
      }
    
    useEffect(() => {
        switch (month){
            case 3:
                setData(eachGraphInfo[0].yhat)
                setDataLower(eachGraphInfo[0].lower)
                setDataUpper(eachGraphInfo[0].upper)
                setDuration(eachGraphInfo[0].duration)
                setForecastPoint(eachGraphInfo[0].forecastDataPoint)
                setTicker(eachGraphInfo[0].tickAmount)
                setRate(eachGraphInfo[0].fluctuation)
                break
            case 6:
                setData(eachGraphInfo[1].yhat)
                setDataLower(eachGraphInfo[1].lower)
                setDataUpper(eachGraphInfo[1].upper)
                setDuration(eachGraphInfo[1].duration)
                setForecastPoint(eachGraphInfo[1].forecastDataPoint)
                setTicker(eachGraphInfo[1].tickAmount)
                setRate(eachGraphInfo[1].fluctuation)
                break
            case 12:
                setData(eachGraphInfo[2].yhat)
                setDataLower(eachGraphInfo[2].lower)
                setDataUpper(eachGraphInfo[2].upper)
                setDuration(eachGraphInfo[2].duration)
                setForecastPoint(eachGraphInfo[2].forecastDataPoint)
                setTicker(eachGraphInfo[2].tickAmount)
                setRate(eachGraphInfo[2].fluctuation)
                break
            default:
              setData(eachGraphInfo[0].yhat)
              setDataLower(eachGraphInfo[0].lower)
              setDataUpper(eachGraphInfo[0].upper)
              setDuration(eachGraphInfo[0].duration)
              setForecastPoint(eachGraphInfo[0].forecastDataPoint)
              setTicker(eachGraphInfo[0].tickAmount)
              setRate(eachGraphInfo[0].fluctuation)
    }
    }, [month] );

    // console.log("data", data)
    // console.log("lower", dataLower)
    // console.log("upper", dataUpper)
    // console.log("duration", duration)
    // console.log("forecastDataPoint", forecastPoint)
    // console.log("ticker", ticker)
    // console.log("fluctuation rate", rate)

// const x = true;
    const series= [
        {
          name: "Disk Available",
          // type: 'line',
          data: data
        },
        {
          name: "Disk Available",
          // type: 'line',
          data: dataLower
        },
        {
          name: "Disk Available",
          // type: 'area',
          data: dataUpper
        }

    ]
    const options = {
      chart: {
        height: 550,
        type: "line"
      },
      forecastDataPoints: {
        count: forecastPoint,
        dashArray: 2
      },
      stroke: {
        width: 2,
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: duration,
        tickAmount: ticker,
        labels: {
          datetimeFormatter: {
            year: 'yyyy',
            month: 'MMM \'yy',
            day: 'dd MMM',
            hour: 'HH:mm'
          },
          style: {
            fontSize: '10'
          },
        }
      },
      title: {
        text: "",
        align: "left",
        style: {
          fontSize: "16px",
          color: "#666"
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          inverseColors: false,
          shade: "light",
          gradientToColors: ['#f00', '#f00', '#f00', '#f00', '#f00'],    
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 0.5,
          stops: [0, 50, 100, 0]
        }
      },
      yaxis: {
        min: 0,
        max: 100,
        labels: {
          formatter: (val, index) => {
            return val
          }
        }
        // tickAmount: 1
        // forceNiceScale: true
      }
    };
  
    // const a = rate.toFixed(2)
    // const [graphData, setGraphData] = useState(jsonGraph)
    
    
    return (
        <div id="chart">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-[18px] font-bold my-6">
              Disk prediction in {month} months
            </h2>
            <div className="inline-flex">
              <button onClick={() => handleClick(3)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                3 months
              </button>
              <button onClick={() => handleClick(6)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4">
                6 months
              </button>
              <button onClick={() => handleClick(12)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                1 year
              </button>
            </div>
          </div>
          <ReactApexChart options={options} series={series} type="line" height={500}/>
          <div className="flex justify-center flex-row">
            <h1 className="justify-center">{rate[0]} Rate:</h1>
            <p className="font-bold">{"\u00a0\u00a0"}{rate[1]}</p>
          </div>
        </div>
      );
  }

export default ForecastGraph