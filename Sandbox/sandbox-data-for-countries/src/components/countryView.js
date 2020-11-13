import React, { useState, useEffect } from "react";

const CountryView = ({ country, display, weather }) => {
  if (display === true) {
    return (
      <div>
        <h2 key={country.alpha3Code}>{country.name}</h2>
        <p>Capital {country.capital}</p>
        <p>Population {country.population}</p>
        <h3>Languages</h3>
        <ul>
          {country.languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img src={country.flag} style={{ maxWidth: "200px" }} />
        <h3>Weather in {country.name}</h3>
        <p>
          <strong>Temperature: </strong>
          {weather.current.temperature} celsius
        </p>
        <img src={weather.current.weather_icons[0]} />
        <p>
          <strong>wind: </strong>
          {weather.current.wind_speed} mph direction {weather.current.wind_dir}
        </p>
      </div>
    );
  } else {
    return null;
  }
};

export default CountryView;
