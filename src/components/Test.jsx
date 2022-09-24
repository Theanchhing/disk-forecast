import React, { useState } from 'react'
import Select from 'react-select'

import { eachGraphInfo } from './graphInfos'
import listOfForecast from "../assets/list_of_forecast.json"

const options = [
  { value: listOfForecast[0], label: 'Instance 1' },
  { value: listOfForecast[1], label: 'Instance 2' },
  { value: 'vanilla', label: 'Vanilla' }
]


const Test = () => {
    const [instance, setInstance] = useState(eachGraphInfo)
    const handleClick = (opt) => {
        console.log(opt.value)
        setInstance(opt.value)
    }
    console.log(instance)

    return (
        <Select
            options={options}
            onChange={handleClick}
        />
    )
}

export default Test