import React, { useEffect, useState } from "react";
import CountryView from "./countryView";
import axios from "axios";

const ListItem = ({ country, hideList }) => {
  const [showCountry, setShowCountry] = useState(false);
  const displayCountry = () => {
    setShowCountry(!showCountry);
  };

  const [weather, setWeather] = useState({});
  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const query = country.name;
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${query}`;

    axios.get(url).then((response) => {
      setWeather(response.data);
    });
  }, []);

  if (hideList === true) {
    return (
      <>
        <CountryView country={country} display={true} weather={weather} />
      </>
    );
  } else {
    return (
      <>
        <li>
          {country.name}{" "}
          <button onClick={displayCountry}>
            {showCountry ? "Hide" : "Show"}
          </button>
        </li>
        <CountryView
          country={country}
          display={showCountry}
          weather={weather}
        />
      </>
    );
  }
};

export default ListItem;
