import "./WeatherDay.styles.css";

export default function WeatherDay({ forecast }) {
  return (
    <div className="weather-day" key={forecast.dt}>
      <div className="weather-day-main-container">
        <h3 className="weather-day-time">
          {new Date(forecast.dt * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </h3>
        <div className="weather-day-data">
          <p className="weather-day-description">{forecast.weather[0].main}</p>
          <p className="weather-day-info">
            <strong className="weather-day-sub-title">Temperature:</strong>{" "}
            {Math.round(forecast.main.temp - 273.15)}&deg;
          </p>
          <p className="weather-day-info">
            <strong className="weather-day-sub-title">Wind Speed:</strong>{" "}
            {Math.round(forecast.wind.speed)} mps
          </p>
        </div>
      </div>
      <img
        className="weather-day-img"
        src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@4x.png`}
        alt={`${forecast.weather[0].main} icon`}
      />
    </div>
  );
}
