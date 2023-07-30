import WeatherDay from "../WeatherDay/WeatherDay.component";

import "./WeatherDays.styles.css";

export default function WeatherDays({ list, startTimestamp, endTimestamp }) {
  return (
    <div className="weather-days">
      <h2 className="weather-date margin-bottom">
        {`${
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
            new Date(startTimestamp).getDay()
          ]
        } ${new Date(startTimestamp).getDate()} ${
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ][new Date(startTimestamp).getMonth()]
        }`}
      </h2>
      <div className="weather-days-list-container">
        <div className="weather-days-list">
          {list
            .filter(
              (forecast) =>
                forecast.dt * 1000 >= startTimestamp &&
                forecast.dt * 1000 < endTimestamp
            )
            .map((forecast) => (
              <WeatherDay forecast={forecast} key={forecast.dt} />
            ))}
        </div>
      </div>
    </div>
  );
}
