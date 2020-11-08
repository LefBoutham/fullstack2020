import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameInput = (event) => {
    console.log("Name added :D");
    setNewName(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
    };

    for (person in persons) {
      if (person.name === newName) {
        window.alert(`${newName} is already added to the phonebook`);
        return;
      }
      setPersons(persons.concat(personObject));
      setNewName("");
      document.getElementById("form").reset();
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form id="form">
        <div>
          name: <input onChange={handleNameInput} />
        </div>
        <div>
          <button onClick={addName} type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => {
          return <li key={person.name}>{person.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default App;
