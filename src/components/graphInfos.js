import forecast_3 from '../assets/3_forecast.json'
import forecast_6 from '../assets/6_forecast.json'
import forecast_12 from '../assets/12_forecast.json'

const getDatesBetweenDates = (startDate, endDate) => {
    let dates = []
    //to avoid modifying the original date
    const theDate = new Date(startDate)
    const theEndDate = new Date(endDate)
    while (theDate < theEndDate) {
      dates = [...dates, format(new Date(theDate))]
      theDate.setDate(theDate.getDate() + 1)
    }
    dates = [...dates, theEndDate]
    return dates
  }
  
const format = (date) => {
    return (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear())
}

const startDateArr = [
    new Date(forecast_3[0].ds),
    new Date(forecast_6[0].ds),
    new Date(forecast_12[0].ds)
]

const endDateArr = [
    new Date(forecast_3[forecast_3.length-1].ds),
    new Date(forecast_6[forecast_6.length-1].ds),
    new Date(forecast_12[forecast_12.length-1].ds)
]


let dateArr = []
for (let i = 0; i<3; i++){
    let temp = []
    temp.push(getDatesBetweenDates(startDateArr[i], endDateArr[i]))
    dateArr.push(temp)
}
// console.log(dateArr)

const duration_3 = dateArr[0][0]
const duration_6 = dateArr[1][0]
const duration_12 = dateArr[2][0]
const durations = [duration_3, duration_6,duration_12]

const eachGraphInfo = [ {}, {}, {}]

let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
// console.log('today ', typeof today)

const allForecasts = [forecast_3, forecast_6, forecast_12]

for (let i = 0; i < 3; i++){
    let temp = {}
    let dataSeries = []
    let dataLowerSeries = []
    let dataUpperSeries = []
    for (let j=0; j<dateArr[i][0].length; j++) {
        dataSeries.push(parseFloat(allForecasts[i][j].yhat))
        dataLowerSeries.push(parseFloat(allForecasts[i][j].yhat_lower))
        dataUpperSeries.push(parseFloat(allForecasts[i][j].yhat_upper))
        if (today === dateArr[i][0][j]) {
            temp['freeSpace'] = allForecasts[i][j].yhat
            temp['ticker'] = j+1
            temp['forecast'] = dateArr[i][0].length - (j+1)
            temp['today'] = today
            temp['duration'] = durations[i]       
            temp['firstTicker'] = allForecasts[i][0].yhat
            temp['lastTicker'] = allForecasts[i][allForecasts[i].length-1].yhat
        }
    }
    Object.assign(eachGraphInfo[i], temp, {dataSeries: dataSeries})
    Object.assign(eachGraphInfo[i], temp, {dataLowerSeries: dataLowerSeries})
    Object.assign(eachGraphInfo[i], temp, {dataUpperSeries: dataUpperSeries})
}

// console.log("added duration, freeSpace, ticker, today ", eachGraphInfo)

export { eachGraphInfo }