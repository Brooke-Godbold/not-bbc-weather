import WeatherDay from "../WeatherDay/WeatherDay.component";

import "./WeatherDays.styles.css";

export default function WeatherDays({ list, startTimestamp, endTimestamp }) {
  function getOrdinal(n) {
    let ord = "ᵗʰ";

    if (n % 10 === 1 && n % 100 !== 11) {
      ord = "ˢᵗ";
    } else if (n % 10 === 2 && n % 100 !== 12) {
      ord = "ⁿᵈ";
    } else if (n % 10 === 3 && n % 100 !== 13) {
      ord = "ʳᵈ";
    }

    return ord;
  }

  const startDate = new Date(startTimestamp);

  return (
    <div className="weather-days">
      <h2 className="weather-date margin-bottom">
        {`${
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][startDate.getDay()]
        } ${startDate.getDate()}${getOrdinal(startDate.getDate())} ${
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
          ][startDate.getMonth()]
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
