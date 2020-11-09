import React from "react";

const PersonForm = ({
  nameInput,
  handleNameChange,
  handleNumberChange,
  numberInput,
  addNewPerson,
}) => {
  return (
    <>
      <form>
        <div>
          name: <input value={nameInput} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={numberInput} onChange={handleNumberChange} />
        </div>

        <div>
          <button onClick={addNewPerson} type="submit">
            add
          </button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
