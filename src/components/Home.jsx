import React, { useState, useEffect } from "react";
import ForecastGraph from "./ForecastGraph"
import DiskStatusGraph from "./DiskStatusGraph"
import Select from 'react-select'
// import Test from "./Test";
import listOfForecast from "../assets/list_of_forecast.json"

import axios from "axios"

// import { eachGraphInfo } from "./graphInfos";

// const baseURL = 'http://52.77.44.109:8000/api/v1/forecast/'
const api = axios.create({
    baseURL: `http://52.77.44.109:8000/api/v1`
})
console.log('api', api)
const options = [
    { value: listOfForecast[0], label: 'Instance 1' },
    { value: listOfForecast[1], label: 'Instance 2' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

function Home() {
    const [ instance, setInstance ] = useState(listOfForecast[0])
    const [allInstance, setAllInstance] = useState([])
    // const [test, setTest] = useState(null)

    const handleSwitchInstance = (opt) => {
        console.log("from handle switch instance", opt.value)
        setInstance(opt.value)
    }

    useEffect(() => {
        const fetchForecaseInstances = async () => {
            try {
                const response = await api.get('/forecast/')
                setAllInstance(response.data)
            } catch (e) {
                console.log(e)
            } 
        }
        fetchForecaseInstances()
        // console.log('test constructor', test)
    }, []);

    // useEffect(() => {
    //     setTest(allInstance[0])
    // }, [])

    // console.log('api inside functional component', api)
    console.log('allinstance', allInstance)
    // console.log('test', test)


    return (
      <div className="bg-slate-100 flex justify-center">
        <div className=" w-10/12">
            <div className="flex flex-row w-full items-center mx-auto mt-6">
                <h1 className="text-2xl font-bold">Select your instance </h1>
                <div className="w-80 h-10 bg-red-100 ml-2" >
                    <Select
                        options={options}
                        onChange={handleSwitchInstance}
                    />
                </div>
            </div>
            <div className="grid grid-cols-5">
                <div className="col-span-4">
                    <ForecastGraph  eachGraphInfo={instance}/>
                </div>
                <div className="col-span-1">
                    <DiskStatusGraph eachGraphInfo={instance[0]} />
                </div>
            {/* <Test /> */}
            </div>
        </div>
      </div>
    );
  }
  
  export default Home;
  