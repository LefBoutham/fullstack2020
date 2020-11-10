import React, { useState, useEffect } from "react";
import SearchField from "./components/searchField";
import ListCountries from "./components/listCountries";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchFieldValue, setSearch] = useState("");

  const handleSearchChange = (event) => setSearch(event.target.value);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);
  console.log(countries);

  return (
    <div>
      <SearchField value={searchFieldValue} onChange={handleSearchChange} />
      <ListCountries countries={countries} searchTerm={searchFieldValue} />
    </div>
  );
}

export default App;
