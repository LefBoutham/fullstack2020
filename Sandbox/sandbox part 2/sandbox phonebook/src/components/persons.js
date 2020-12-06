import React from "react";
import Person from "./person";

const Persons = ({ persons, filter, onDelete }) => {
  const listFilter = (person) =>
    person.name.toLowerCase().includes(filter.toLowerCase());

  const personsList = persons
    .filter(listFilter)
    .map((person) => (
      <Person key={person.name} person={person} onDelete={onDelete} />
    ));

  return <>{personsList}</>;
};

export default Persons;
