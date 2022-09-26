import React, { useState, useEffect } from "react";
import ForecastGraph from "./ForecastGraph";
import DiskStatusGraph from "./DiskStatusGraph";
import Select from "react-select";
import { api } from "../service/api";
import { RingLoader } from "react-spinners";

let options = [
  //   { value: listOfForecast[0], label: "Instance 1" },
  //   { value: listOfForecast[1], label: "Instance 2" },
  //   { value: "vanilla", label: "Vanilla" },
];

function Home() {
  const [instance, setInstance] = useState([]);
  //   const [allInstance, setAllInstance] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSwitchInstance = (opt) => {
    setInstance(() => {
      return opt.value;
    });
    // console.log(instance);
  };

  useEffect(() => {
    const fetchForecaseInstances = async () => {
      setLoading(true);
      try {
        const { data: res } = await api.getForecast();
        options = [];
        for (let i = 0; i <= res[0]["json"].length - 1; i++) {
          options.push({
            value: res[0]["json"][i],
            label: `Instance #${i + 1}`,
          });
        }
        setInstance(options[0].value);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchForecaseInstances();
    // console.log(loading);
  }, []);

  const RenderForcast = () => {
    return <ForecastGraph eachGraphInfo={instance} />;
  };

  return (
    <div>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <RingLoader color="#36d7b7" />
        </div>
      )}
      {!loading && options.length > 0 && (
        <div className="flex justify-center">
          <div className=" w-10/12">
            <div className="flex flex-row w-full items-center mx-auto mt-6">
              <h1 className="text-2xl font-medium">Select your instance </h1>
              <div className="w-80 h-10x ml-2">
                <Select
                  options={options}
                  defaultValue={options[0]}
                  onChange={handleSwitchInstance}
                />
              </div>
            </div>
            <div className="grid grid-cols-5">
              <div className="col-span-4">
                <RenderForcast />
              </div>
              <div className="col-span-1">
                <DiskStatusGraph eachGraphInfo={instance[0]} />
              </div>
              {/* <Test /> */}
            </div>
            {/* <RingLoader color="#36d7b7" /> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
