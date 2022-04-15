import { useState, createContext, useContext, useEffect } from "react";
export const CryptoState = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  useEffect(() => {
    if (currency === "INR") {
      setSymbol("RS");
    } else if (currency === "USD") {
      setSymbol("$");
    }
  }, [currency]);
  return <CryptoState.Provider value={{currency,symbol,setCurrency}}>{children}</CryptoState.Provider>;
};
export default CryptoContext;


