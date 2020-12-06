import React from "react";

const Person = (props) => {
  return (
    <>
      {props.person.name} {props.person.number}{" "}
      <button onClick={() => props.onDelete(props.person)}>Delete</button>
      <br />
    </>
  );
};

export default Person;
