import React, { useState } from "react";
import CountryView from "./countryView";
import ListItem from "./listItem";

const ListCountries = ({ countries, searchTerm }) => {
  // Filter countries based on keyword
  const countriesFilter = (country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase());
  const filteredList = countries.filter(countriesFilter);

  // Conditional render
  if (searchTerm) {
    if (filteredList.length > 10) {
      return <div>Too many matches, please specify.</div>;
    } else if (filteredList.length > 1 && filteredList.length < 10) {
      return (
        <>
          <ul>
            {filteredList.map((country) => (
              <ListItem key={country.name} country={country} hideList={false} />
            ))}
          </ul>
        </>
      );
    } else {
      return (
        <div>
          {filteredList.map((country) => (
            <ListItem key={country.name} country={country} hideList={true} />
          ))}
        </div>
      );
    }
  }
  return <div></div>;
};

export default ListCountries;
