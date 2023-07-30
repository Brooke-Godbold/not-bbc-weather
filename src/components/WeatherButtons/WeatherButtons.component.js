import "./WeatherButtons.styles.css";

export default function WeatherButtons({ getDay, dispatch }) {
  return (
    <div className="weather-buttons margin-bottom">
      <button
        className="btn"
        onClick={() => dispatch({ type: "setDaysInFuture", days: 0 })}
      >
        Today
      </button>
      <button
        className="btn"
        onClick={() => dispatch({ type: "setDaysInFuture", days: 1 })}
      >
        {getDay(1)}
      </button>
      <button
        className="btn"
        onClick={() => dispatch({ type: "setDaysInFuture", days: 2 })}
      >
        {getDay(2)}
      </button>
      <button
        className="btn"
        onClick={() => dispatch({ type: "setDaysInFuture", days: 3 })}
      >
        {getDay(3)}
      </button>
      <button
        className="btn"
        onClick={() => dispatch({ type: "setDaysInFuture", days: 4 })}
      >
        {getDay(4)}
      </button>
    </div>
  );
}
