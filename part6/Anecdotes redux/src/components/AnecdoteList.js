import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>has {anecdote.votes}</div>{' '}
      <button onClick={handleClick}>vote</button>
    </div>
  )
}

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes
  const filter = props.filter

  const voteClick = async (anecdote) => {
    props.addVote(anecdote)
    props.setNotification(`You voted '${anecdote.content}'`, 5)
  }
  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <Anecdote
          anecdote={anecdote}
          key={anecdote.id}
          handleClick={() => voteClick(anecdote)}
        />
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filters,
  }
}

const mapDispatchToProps = {
  addVote,
  setNotification,
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdotes
