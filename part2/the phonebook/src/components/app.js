import React, { useEffect, useState } from "react";
import Persons from "./persons";
import Filter from "./filterPeople";
import PersonForm from "./personForm";
import axios from "axios";

const App = () => {
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("success");
      setPersons(response.data);
    });
  }, []);

  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setFilter] = useState("");

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilter = (event) => setFilter(event.target.value);

  const addNewPerson = (event) => {
    event.preventDefault();
    const nameExists = persons.some((person) => person.name === newName);

    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    } else {
      const newPersons = persons.concat({ name: newName, number: newNumber });
      setPersons(newPersons);
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} persons={persons} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm
        nameInput={newName}
        numberInput={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addNewPerson={addNewPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={newFilter} />
    </div>
  );
};

export default App;
