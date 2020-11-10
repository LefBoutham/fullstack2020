import React from "react";

const SearchField = (props) => {
  return (
    <>
      find countries <input value={props.value} onChange={props.onChange} />{" "}
      <br />
    </>
  );
};

export default SearchField;
