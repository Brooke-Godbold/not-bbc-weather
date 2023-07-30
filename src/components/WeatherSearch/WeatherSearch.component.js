import "./WeatherSearch.styles.css";

export default function WeatherSearch({ location, dispatch }) {
  return (
    <div className="weather-search">
      <input
        placeholder="New York, US"
        value={location}
        onChange={(e) =>
          dispatch({ type: "setLocation", location: e.target.value })
        }
      ></input>
      <button className="btn" onClick={() => dispatch({ type: "search" })}>
        Search
      </button>
    </div>
  );
}
