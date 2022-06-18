import axios from "axios";
import { useEffect, useState } from "react";

type Props = {
  lat: number;
  long: number;
};

type APIReturn = {
  array: Data[];
};

type Data = {
  Active: string;
  Deaths: string;
  Confirmed: string;
  Recovered: string;
};

export const Cards = ({ lat, long }: Props) => {
  const [data, setData] = useState<Data[]>();
  const [today, setToday] = useState<Data>();
  const [status, setStatus] = useState<string>();

  async function getDataFromCountry() {
    const info = await axios.get(
      `https://api.covid19api.com/total/country/brazil`
    );

    setData(info.data);
    setToday(info.data[info.data.length - 1]);
  }

  useEffect(() => {
    getDataFromCountry();
    console.log(today);
  }, []);

  return (
    <>
      <ul>
        <li>Confirmados: {today?.Confirmed}</li>
        <li>Recuperados: {today?.Recovered}</li>
        <li>Mortes: {today?.Deaths}</li>
        <li>Ativos: {today?.Active}</li>
        <li>Dados do dia {new Date().toLocaleDateString()}</li>
      </ul>
      {data != undefined ? (
        data.map((item) => {
          return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p key={Math.random()}>{item.Active}</p>
              <p key={Math.random()}>{item.Confirmed}</p>
              <p key={Math.random()}>{item.Deaths}</p>
              <p key={Math.random()}>{item.Recovered}</p>
            </div>
          );
        })
      ) : (
        <>Nada para mostrar</>
      )}
    </>
  );
};
