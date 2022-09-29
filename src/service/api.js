import axios from "axios";
const axi = axios.create({
  baseURL: `http://13.229.236.49:80/api/v1`,
});

async function getForecast() {
  try {
    return await axi.get("/forecast/");
  } catch (error) {}
}

export const api = { getForecast };
