import React from "react";

const Filter = (props) => {
  return (
    <>
      filter shown with{" "}
      <input value={props.value} onChange={props.handleFilter} /> <br />
    </>
  );
};

export default Filter;
