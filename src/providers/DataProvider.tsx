import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface DataValues {
  active: number;
  confirmed: number;
  deaths: number;
  recovered: number;
}

interface DataContext {
  setInfo: Dispatch<SetStateAction<DataValues>>;
  info: DataValues;
  setCountry: Dispatch<SetStateAction<string>>;
  country: string;
}

const INITIAL_VALUE = {
  setInfo: () => 0,
  info: { active: 0, confirmed: 0, deaths: 0, recovered: 0 },
  setCountry: () => "",
  country: "",
};

export const DataContext = createContext<DataContext>(INITIAL_VALUE);

export const DataProvider = (props: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [info, setInfo] = useState<DataValues>({
    active: 0,
    confirmed: 0,
    deaths: 0,
    recovered: 0,
  });

  const [country, setCountry] = useState<string>("");

  return (
    <DataContext.Provider value={{ info, setInfo, country, setCountry }}>
      {props.children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
