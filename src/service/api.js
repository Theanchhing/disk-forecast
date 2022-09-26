import axios from "axios";
const axi = axios.create({
  baseURL: `http://52.77.44.109:8000/api/v1`,
});

async function getForecast() {
  try {
    return await axi.get("/forecast/");
  } catch (error) {}
}

export const api = { getForecast };
