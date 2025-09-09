import { createContext, useCallback, useEffect, useReducer } from "react";

const CitiesContext = createContext();
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "data/loading":
      return { ...state, isLoading: true, error: null };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "cities/added":
    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "data/error":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}
const BASE_URL = "http://localhost:8000";
function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "data/loading" });
      try {
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "data/error", payload: error.message });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    dispatch({ type: "data/loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) throw new Error("Something went wrong with fetching the city");
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (err) {
      dispatch({
        type: "data/error",
        payload: err.message,
      });
    }
  },[currentCity.id]);

  async function createCity(newCity) {
    dispatch({ type: "data/loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Something went wrong with creating the city");
      const data = await res.json();
      dispatch({
        type: "cities/added",
        payload: [...cities, data],
      });
    } catch (err) {
      dispatch({
        type: "data/error",
        payload: err.message,
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "data/loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({
        type: "cities/deleted",
        payload: cities.filter((city) => city.id !== id),
      });
    } catch (err) {
      dispatch({
        type: "data/error",
        payload: err.message,
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, error, getCity, createCity, deleteCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesContext, CitiesProvider };
