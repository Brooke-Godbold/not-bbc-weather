import { useEffect, useReducer } from "react";
import "./App.css";

import WeatherResponse from "./weatherResponse.json";
import WeatherDays from "./components/WeatherDays/WeatherDays.component";
import WeatherButtons from "./components/WeatherButtons/WeatherButtons.component";
import WeatherSearch from "./components/WeatherSearch/WeatherSearch.component";
import Error from "./components/Notification/Error.component";
import Loading from "./components/Notification/Loading.component";

import "./Queries.css";

const API_KEY = "9d4c05fa102279ba312f2ae60286022c";

const initialState = {
  daysInFuture: 0,
  startTimestamp: 0,
  endTimestamp: 0,
  location: "",
  isLoading: false,
  weatherData: null,
  isError: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "setDaysInFuture":
      return {
        ...state,
        daysInFuture: action.days,
      };
    case "setTimestamps":
      return {
        ...state,
        startTimestamp: action.startTimestamp,
        endTimestamp: action.endTimestamp,
      };
    case "setLocation":
      return {
        ...state,
        location: action.location,
      };
    case "search":
      return {
        ...state,
        daysInFuture: 0,
        weatherData: null,
        isLoading: true,
        isError: false,
      };
    case "setWeather":
      return {
        ...state,
        isLoading: false,
        weatherData: action.weatherData,
      };
    case "apiError":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error("Unknown Action");
  }
}

function App() {
  const [
    {
      daysInFuture,
      startTimestamp,
      endTimestamp,
      location,
      isLoading,
      weatherData,
      isError,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(
    function () {
      async function fetchWeather() {
        if (!isLoading || location.length <= 3) return;

        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}`
          );
          const data = await res.json();
          console.log(data);

          if (data.cod !== "200") {
            dispatch({ type: "apiError" });
          } else {
            dispatch({ type: "setWeather", weatherData: data });
          }
        } catch (err) {
          dispatch({ type: "apiError" });
        }
      }

      fetchWeather();
    },
    [isLoading, location]
  );

  useEffect(
    function () {
      const startDate = new Date();
      startDate.setDate(new Date().getDate() + daysInFuture);

      if (daysInFuture !== 0) startDate.setHours(0, 0, 0, 0);

      const start = startDate.getTime();

      const endDate = new Date();
      endDate.setDate(new Date().getDate() + (daysInFuture + 1));
      endDate.setHours(0, 0, 0, 0);
      const end = endDate.getTime();

      dispatch({
        type: "setTimestamps",
        startTimestamp: start,
        endTimestamp: end,
      });
    },
    [daysInFuture]
  );

  function getDay(days) {
    const d = new Date();
    d.setDate(new Date().getDate() + days);
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
      new Date(d).getDay()
    ];
  }

  return (
    <div className="app container">
      <h1>Not BBC Weather</h1>
      <WeatherSearch location={location} dispatch={dispatch} />
      {weatherData && !isLoading && (
        <>
          <h2 className="margin-bottom">{weatherData.city.name}</h2>
          <WeatherButtons getDay={getDay} dispatch={dispatch} />
          <WeatherDays
            list={weatherData.list}
            startTimestamp={startTimestamp}
            endTimestamp={endTimestamp}
          />
        </>
      )}
      {isError && !isLoading && <Error />}
      {isLoading && !isError && <Loading />}
    </div>
  );
}

export default App;
