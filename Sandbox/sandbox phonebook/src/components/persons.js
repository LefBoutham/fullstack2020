import React from "react";
import Person from "./person";

const Persons = ({ persons, filter }) => {
  const listFilter = (person) =>
    person.name.toLowerCase().includes(filter.toLowerCase());

  const personsList = persons
    .filter(listFilter)
    .map((person) => (
      <Person key={person.name} name={person.name} number={person.number} />
    ));

  return <>{personsList}</>;
};

export default Persons;
