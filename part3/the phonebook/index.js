const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

// Morgan middleware Config
morgan.token('text', function getId(req) {
    return JSON.stringify(req.body)
})

// Middleware
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :text'
    )
)

// Error handler middleware Config
const errorHandler = (error, request, response, next) => {
    console.error(error)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error })
    }

    next(error)
}

///////////////////////////////////////////
// Server commands
///////////////////////////////////////////

// Front page -- overriden with middleware
app.get('/', (request, response) => {
    response.send('Hello World!')
})

// Info page
app.get('/info', (request, response, next) => {
    const date = new Date()

    Person.count({}, (err, count) => {
        response.send(
            `<p>Phonebook has info for ${count} people</p></br> ${date}`
        )
    }).catch((err) => next(err))
})

// Persons api
app.get('/api/persons', (request, response) => {
    // List all persons from MongoDB
    Person.find({}).then((persons) => response.json(persons))
})

// Single person
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then((person) => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).send({ error: 'unknown endpoint' })
            }
        })
        .catch((error) => {
            next(error)
        })
})
// // Unknown endpoint + error handler middleware
// app.use(unknownEndpoint);

// Delete persons
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch((error) => next(error))
})

// Modify persons
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        content: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, {
        new: true,
        runValidators: true,
    })
        .then((updatedPerson) => {
            response.json(updatedPerson)
        })
        .catch((error) => next(error))
})

// Add persons
app.post('/api/persons/', (request, response, next) => {
    const body = request.body
    const newPerson = new Person({
        name: body.name,
        number: body.number,
    })

    newPerson
        .save()
        .then((savedPerson) => savedPerson.toJSON())
        .then((formattedPerson) => response.json(formattedPerson))
        .catch((error) => {
            next(error)
        })
})
app.use(errorHandler)

// Server start
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
