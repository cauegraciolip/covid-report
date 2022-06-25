import axios from "axios";
import { FormEvent, useState } from "react";
import { useData } from "../providers/DataProvider";
import { allCountries } from "../utils/utils";

interface Countries {
  name: string;
  code: string;
}

export function Search() {
  const { setCountry } = useData();

  const [value, setValue] = useState<string>("");
  const [search, setSearch] = useState<Countries[]>([]);

  function findCountryInSearch(e: FormEvent<HTMLInputElement>) {
    const newValue = e.currentTarget.value.toUpperCase();

    const search = allCountries.filter((country) =>
      country.name.toUpperCase().includes(newValue)
    );

    setSearch(search);
    setValue(e.currentTarget.value);
  }

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
          onChange={findCountryInSearch}
          value={value}
        />
        <button type="submit">CLIQUE AQUI</button>
      </form>
      {value == ""
        ? ""
        : search.map((country) => {
            return (
              <div onClick={() => setValue(country.name)} key={country.code}>
                {country.name}
              </div>
            );
          })}
    </>
  );
}
