import React, { useEffect, useState } from 'react'
import Persons from './persons'
import Filter from './filterPeople'
import PersonForm from './personForm'
import personsService from '../services/persons'
import '../index.css'

const ErrorMsg = ({ message }) => {
    if (message === null) {
        return null
    }

    return <div className="error">{message}</div>
}

const SuccessMsg = ({ message }) => {
    if (message === null) {
        return null
    }

    return <div className="success">{message}</div>
}

const App = () => {
    // Handle states
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setFilter] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    // Fetch persons from server
    useEffect(() => {
        personsService.getAll().then((response) => {
            setPersons(response.data)
        })
    }, [])

    // Event handlers
    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)
    const handleFilter = (event) => setFilter(event.target.value)

    // Add a new person on the list
    const addNewPerson = (event) => {
        event.preventDefault()
        const nameExists = persons.some((person) => person.name === newName)
        const isNumberIdentical = persons.some(
            (person) => person.number === newNumber && person.name === newName
        )

        // If name and number are the same
        if (nameExists && isNumberIdentical) {
            alert(`${newName} is already added to phonebook`)
            return

            // If only the name is the same
        } else if (nameExists) {
            if (
                window.confirm(
                    `${newName} is already added to the phonebook, replace old number with a new one?`
                )
            ) {
                const selectedPerson = persons.filter(
                    (person) => person.name === newName
                )[0]
                console.log(selectedPerson)
                const updatedPerson = {
                    ...selectedPerson,
                    number: newNumber,
                }
                console.log(updatedPerson)
                personsService
                    .update(selectedPerson.id, updatedPerson)
                    .then((returnValue) => {
                        console.log(returnValue.data)
                        const modifiedPersons = persons
                        const personIndex = modifiedPersons.findIndex(
                            (el) => el === selectedPerson
                        )
                        modifiedPersons[personIndex] = returnValue.data
                        setPersons(modifiedPersons)
                        setSuccessMessage(`Edited ${selectedPerson.name}`)
                        setTimeout(() => setSuccessMessage(null), 5000)
                        console.log(modifiedPersons)
                    })
                    .catch((error) => {
                        console.error(error.response.data.error.message) // ***
                        setErrorMessage(error.response.data.error.message)
                        setTimeout(() => setErrorMessage(null), 5000)
                    })
                setNewName('')
                setNewNumber('')
            }
        }

        // If the person is new, add the person on the list.
        else {
            const personObject = {
                name: newName,
                number: newNumber,
            }
            personsService
                .create(personObject)
                .then((response) => {
                    const newPersonObject = {
                        ...personObject,
                        id: response.data.id,
                    }
                    setPersons(persons.concat(newPersonObject))
                    setNewName('')
                    setNewNumber('')
                    setSuccessMessage(`Added ${newPersonObject.name}`)
                    setTimeout(() => setSuccessMessage(null), 5000)
                })
                .catch((error) => {
                    setErrorMessage(error.response.data.error.message)
                    setTimeout(() => setErrorMessage(null), 5000)
                })
        }
    }

    // Delete person handler
    const handleDeletePerson = (person) => {
        if (window.confirm(`Delete ${person.name} ?`)) {
            const updatedPersons = persons.filter((x) => {
                return x.id !== person.id
            })
            personsService.deletePerson(person.id)
            console.log(updatedPersons)
            setPersons(updatedPersons)
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <ErrorMsg message={errorMessage} />
            <SuccessMsg message={successMessage} />
            <Filter
                value={newFilter}
                persons={persons}
                handleFilter={handleFilter}
            />
            <h3>Add a new</h3>
            <PersonForm
                nameInput={newName}
                numberInput={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                addNewPerson={addNewPerson}
            />
            <h3>Numbers</h3>
            <Persons
                persons={persons}
                filter={newFilter}
                onDelete={handleDeletePerson}
            />
        </div>
    )
}

export default App
