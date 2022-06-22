import axios from "axios";

export async function getDataFromCountry(country: string) {
  const data = await axios.get(
    `https://api.covid19api.com/live/country/${country}`
  );

  return data;
}
