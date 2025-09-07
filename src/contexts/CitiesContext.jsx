import { createContext, useState, useEffect, useMemo } from "react";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({}); 

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
  const value = useMemo(() => ({ cities, isLoading, currentCity, setCurrentCity, setIsLoading }), [cities, isLoading, currentCity]);

  return <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>;
}

export { CitiesContext, CitiesProvider };
