import React, { useState } from "react";

const ListCountries = ({ countries, searchTerm }) => {
  const countriesFilter = (country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase());

  const filteredList = countries.filter(countriesFilter);
  console.log(filteredList);
  if (searchTerm) {
    if (filteredList.length > 10) {
      return <div>Too many matches, please specify.</div>;
    } else if (filteredList.length > 1 && filteredList.length < 10) {
      return (
        <div>
          {filteredList.map((country) => (
            <li key={country.alpha3Code}>{country.name}</li>
          ))}
        </div>
      );
    } else {
      return (
        <div>
          {filteredList.map((country) => (
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
            </div>
          ))}
        </div>
      );
    }
  }
  return <div></div>;
};

export default ListCountries;
