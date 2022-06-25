import axios from "axios";
import { useEffect, useState } from "react";
import { useData } from "../providers/DataProvider";

type Data = {
  Active: string;
  Deaths: string;
  Confirmed: string;
  Recovered: string;
};

export const Cards = () => {
  const [today, setToday] = useState<Data>();

  const { country } = useData();

  async function getDataFromCountry(country: string) {
    const address = country.split(" ").join("-").toLowerCase();

    const info = await axios.get(
      `https://api.covid19api.com/total/country/${address}`
    );
    setToday(info.data[info.data.length - 1]);
  }

  useEffect(() => {
    if (country != "") getDataFromCountry(country);
  }, [country]);

  return (
    <>
      <ul>
        {today != undefined ? (
          <>
            <li>Confirmados: {today.Confirmed}</li>
            <li>Recuperados: {today.Recovered}</li>
            <li>Mortes: {today.Deaths}</li>
            <li>Ativos: {today.Active}</li>
            <li>Dados do dia {new Date().toLocaleDateString()}</li>
          </>
        ) : (
          <>Nenhuma informação disponível</>
        )}
      </ul>
    </>
  );
};
