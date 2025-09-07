import { createContext, useState, useEffect, useMemo } from "react";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(function () {
    async function fetchCities() {
      setIsLoading(true);
      const response = await fetch("http://localhost:8000/cities");
      const data = await response.json();
      setCities(data);
      setIsLoading(false);
    }
    fetchCities();
  }, []);

  //apply usememo
  const value = useMemo(() => ({ cities, isLoading }), [cities, isLoading]);

  return <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>;
}

export { CitiesProvider, CitiesContext };
