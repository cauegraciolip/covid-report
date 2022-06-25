import { useEffect } from "react";
import { Cards } from "./components/Cards";
import { Search } from "./components/Search";

import { useData } from "./providers/DataProvider";
import axios from "axios";

function App() {
  const { country, setCountry, setInfo } = useData();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position: GeolocationPosition) => {
        const data = await axios.get(
          "https://nominatim.openstreetmap.org/reverse?format=jsonv2&accept-language=en",
          {
            params: {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            },
          }
        );
        setCountry(data.data.address.country);
      }
    );
  }, []);

  // async function getDataByCountry(country: string) {
  //   const address = country.split(" ").join("-");

  //   const info = await axios.get(
  //     `https://api.covid19api.com/total/country/${address}`
  //   );

  //   setInfo(info.data);
  // }

  // useEffect(() => {
  //   getDataByCountry(country);
  // }, [country]);

  return (
    <>
      <Search />
      <Cards />
    </>
  );
}

export default App;
