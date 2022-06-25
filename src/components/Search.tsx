import axios from "axios";
import { useState } from "react";
import { useData } from "../providers/DataProvider";

export function Search() {
  const { setCountry } = useData();

  const [value, setValue] = useState<string>("");

  async function searchDataWithText(e: { preventDefault: () => void }) {
    e.preventDefault();

    // const data = await axios.get(
    //   `https://api.covid19api.com/total/country/${value}`
    // );

    setCountry(value);
  }

  return (
    <>
      <form onSubmit={searchDataWithText}>
        <input
          type="text"
          name="search"
          id="search-input"
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">CLIQUE AQUI</button>
      </form>
    </>
  );
}
