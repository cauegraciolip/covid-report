import { useEffect, useState } from "react";
import { Cards } from "./components/Cards";

import { Location } from "./types/types";

function App() {
  const [location, setLocation] = useState<Location>({ lat: 0, long: 0 });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      },
      function (error) {
        if (error.code == error.PERMISSION_DENIED) {
          console.error("Nenhuma informação de localização disponível");
        }
      }
    );
  }, []);

  return <Cards {...location} />;
}

export default App;
