import React from "react";
import ReactApexChart from "react-apexcharts";

// import { eachGraphInfo } from "./graphInfos";

const DiskStatusGraph = ({eachGraphInfo}) => {
  // console.log("from dist status", eachGraphInfo)
    const freeSpace = eachGraphInfo.freeSpace
    const diskUsed = 100 - freeSpace
    
    const series= [ diskUsed, freeSpace ]
    const options = {
        labels: ['Disk used', 'Disk available'],
        colors: ['#fa5c4b', '#48a8f7'],
        chart: {
            type: 'donut',
          },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }],
        legend: {
          position: 'bottom'
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: false,
                total: {
                  show: true,
                  label: 'Disk Status ' ,
                  fontSize: '14px',
                  formatter: () => eachGraphInfo[0].today
                }
              }
            }
          }
        }
    };
  
    // const [graphData, setGraphData] = useState(jsonGraph)
    
    
    return (
      <div className="ml-3">
        <h2 className="text-[18px] font-medium my-6">
            Current disk status
        </h2>
        <p>{eachGraphInfo.today}</p>
        {/* <div className="flex"> */}
          <div className="">
            <ReactApexChart options={options} series={series} type="donut" height={300} />
          </div>
        {/* </div> */}
      </div>
      );
  }

export default DiskStatusGraph;