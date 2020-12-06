import React from "react";

const Person = ({ onDelete, person }) => {
  return (
    <>
      {person.name} {person.number}{" "}
      <button onClick={() => onDelete(person)}>Delete</button>
      <br />
    </>
  );
};

export default Person;
